const AppClient = require("uu_appg01_server").AppClient;
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { UseCaseError } = require("uu_appg01_server").AppServer;
const { UriBuilder } = require("uu_appg01_server").Uri;

const CHAR_MAP = {
  128: "",
  147: "–",
  150: "–",
  151: "–",
  154: "š",
  158: "ž",
  216: "Ř",
  138: "Š",
  142: "Ž",
  200: "Č",
  225: "á",
  226: "",
  232: "č",
  233: "é",
  236: "ě",
  248: "ř",
  237: "í",
  195: "í",
  242: "ň",
  243: "ó",
  249: "ů",
  250: "ú",
  253: "ý",
};

SPRINTMAN_OIDC_URI = "https://uuapp-dev.plus4u.net/uu-oidc-maing02/eca71064ecce44b0a25ce940eb8f053d/oidc";
HOLLY_CREDENTIALS = {
  username: "Holly_Hudson",
  password: "Cq%iaz#9w-#z7C8yZlZoC$DsebIK2JGWyDK8lg8J7vLFSKXtYFt5tn3eI3WthZtI",
};

PRIORITY_MAP = {
  "Must have!": "must",
  "Should have.": "should",
  "Could have.": "could",
};

const dtoInSchema = `
  const createReportBaselineDtoInType = shape({
    attachmentUri: uri().isRequired(),
    sprintmanBaseUri: uri().isRequired(),
    sprintId: id().isRequired(),
  });
`;

const Errors = {
  ERROR_PREFIX: "uu-sprintman-tool-scriptlib/import-tickets/",
  InvalidDtoIn: class extends UseCaseError {
    constructor(dtoOut, paramMap, cause) {
      super({ dtoOut, paramMap, status: 400 }, cause);
      this.code = `${Errors.ERROR_PREFIX}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TicketCreateCall: class extends UseCaseError {
    constructor(dtoOut, paramMap, cause) {
      super({ dtoOut, paramMap, status: 400 }, cause);
      this.message = "Ticket Create Call failed";
      this.code = `${Errors.ERROR_PREFIX}ticketCreateCall`;
    }
  },
};

const Warnings = {
  unsupportedKeys: `${Errors.ERROR_PREFIX}unsupportedKeys`,
};

function validateDtoIn(dtoIn) {
  const validator = new Validator(dtoInSchema, true);
  const validationResult = validator.validate("createReportBaselineDtoInType", dtoIn);
  return ValidationHelper.processValidationResult(dtoIn, validationResult, {}, Warnings.unsupportedKeys, Errors.InvalidDtoIn);
}

function readReqBody(req, parseAsJson) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      let data = "";
      chunk.forEach((byte) => {
        let newChar = Object.keys(CHAR_MAP).includes(byte.toString()) ? CHAR_MAP[`${byte}`] : String.fromCharCode(byte);

        data += newChar;
      });
      body += data;
    });
    req.on("error", reject);

    req.on("end", () => {
      if (parseAsJson) {
        resolve(JSON.parse(body));
      } else {
        resolve(body);
      }
    });
  });
}

async function callTicketCreate(ticket, sprintId, sprintManClient) {
  let createdTicket;
  let dtoIn = {
    name: ticket.name,
    desc: ticket.description,
    priority: PRIORITY_MAP[ticket.priority],
    complexity: ticket.complexity,
    responsibleSolver: ticket.responsibleSolver,
    sprint: sprintId,
    backlogRequestCode: ticket.backlogRequestCode,
  };

  try {
    console.info(`HDS3 - Calling ticket/create with dtoIn: ${JSON.stringify(dtoIn)}`);
    createdTicket = await sprintManClient.post("ticket/create", dtoIn);
  } catch (e) {
    console.error(`HDS3 - Calling ticket/create with dtoIn: ${JSON.stringify(dtoIn)}`);
    throw new Errors.TicketCreateCall(dtoOut, dtoIn, e);
  }

  return createdTicket;
}

async function getSession(oidcUri, username, password) {
  const loginData = {
    grant_type: "password",
    username,
    password,
    scope: "openid http:// https://",
  };

  const response = await AppClient.post(UriBuilder.parse(oidcUri).setUseCase("oidc/grantToken").toString(), loginData);

  const session = {
    getCallToken: () => `Bearer ${response.id_token}`,
  };

  return session;
}

const { dtoIn, console, session } = scriptContext;
const dtoOut = { dtoIn, itemList: [] };

async function main() {
  // HDS 1 - Validation of dtoIn
  dtoOut.uuAppErrorMap = validateDtoIn(dtoIn);

  //HDS 2 - Load data from resource
  console.info(`HDS2 - Get data from attachmentUri: ${dtoIn.attachmentUri}`);
  let getScriptResponse = await AppClient.get(dtoIn.attachmentUri, null, { session, enableStreamApi: true });
  let ticketList = await readReqBody(getScriptResponse.data, true);

  // HDS 3 - Create tickets in Sprintman
  const sprintmanSession = await getSession(SPRINTMAN_OIDC_URI, HOLLY_CREDENTIALS.username, HOLLY_CREDENTIALS.password);
  const sprintManClient = new AppClient({ baseUri: dtoIn.sprintmanBaseUri, session: sprintmanSession });

  for (const ticket of ticketList) {
    let createdTicket = (await callTicketCreate(ticket, dtoIn.sprintId, sprintManClient)).data;
    dtoOut.itemList.push(createdTicket);
  }

  //HDS 4
  console.info("HDS8 - Script finished.");
  return dtoOut;
}

main();
