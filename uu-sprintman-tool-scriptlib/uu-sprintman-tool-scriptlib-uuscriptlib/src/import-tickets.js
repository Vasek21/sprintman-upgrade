const AppClient = require("uu_appg01_server").AppClient;
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { UseCaseError } = require("uu_appg01_server").AppServer;
const { UriBuilder } = require("uu_appg01_server").Uri;
const crypto = require("crypto");

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

const SPRINTMAN_OIDC_URI = "https://uuapp-dev.plus4u.net/uu-oidc-maing02/eca71064ecce44b0a25ce940eb8f053d/oidc";
const HOLLY_CREDENTIALS = {
  username: "Holly_Hudson",
  password: "Cq%iaz#9w-#z7C8yZlZoC$DsebIK2JGWyDK8lg8J7vLFSKXtYFt5tn3eI3WthZtI",
};

const PRIORITY_MAP = {
  "Must have!": "must",
  "Should have.": "should",
  "Could have.": "could",
};

const PROGRESS_USE_CASE_MAP = {
  get: "progress/get",
  create: "progress/create",
  start: "progress/start",
  proceed: "progress/proceed",
  end: "progress/end",
  releaseLock: "progress/releaseLock",
  setUp: "progress/setUp",
  setState: "progress/setState",
  delete: "progress/delete",
};

const dtoInSchema = `
  const createReportBaselineDtoInType = shape({
    attachmentUri: uri().isRequired(),
    sprintmanBaseUri: uri().isRequired(),
    consoleBaseUri: uri().isRequired(),
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

const { dtoIn, console: uuConsole, session } = scriptContext;
let uuProgress;

//@@viewOn:UuProgress
// FIXME UuProgress will be a server/script library similar to UuConsole
class UuProgress {
  constructor({ code, name, lockSecret, consoleBaseUri, session }) {
    this.code = code;
    this.name = name;
    this.lockSecret = lockSecret || crypto.randomBytes(32).toString("hex");
    this.progressAppClient = new AppClient({
      baseUri: consoleBaseUri,
      session,
    });
  }
}

UuProgress.prototype.getOrCreate = async function (customDtoIn) {
  let progress;

  // try to get progress with given code
  try {
    progress = await this.progressAppClient.get(PROGRESS_USE_CASE_MAP.get, {
      code: this.code,
    });
  } catch (e) {
    uuConsole.warning(objectToUu5String(e, "progress/get failed"));
  }
  if (progress) return progress;

  // try to create progress if it does not exist (get was not successful)
  try {
    progress = await this.progressAppClient.post(PROGRESS_USE_CASE_MAP.create, {
      code: this.code,
      name: this.name,
      ...customDtoIn,
    });
  } catch (e) {
    uuConsole.warning(objectToUu5String(e, "progress/create failed"));
  }

  // raise error if progress does not exist (could not be created)
  if (progress) {
    return progress;
  } else {
    throw new Errors.ScriptFailed();
  }
};

UuProgress.prototype.start = async function (customDtoIn) {
  try {
    return await this.progressAppClient.post(PROGRESS_USE_CASE_MAP.start, {
      code: this.code,
      lockSecret: this.lockSecret,
      ...customDtoIn,
    });
  } catch (e) {
    uuConsole.error(objectToUu5String(e, "progress/start failed"));
    throw new Errors.ScriptFailed();
  }
};

UuProgress.prototype.proceed = async function (customDtoIn) {
  try {
    return this.progressAppClient.post(PROGRESS_USE_CASE_MAP.proceed, {
      code: this.code,
      lockSecret: this.lockSecret,
      ...customDtoIn,
    });
  } catch (e) {
    uuConsole.warning(objectToUu5String(e, "progress/proceed failed"));
  }
};

UuProgress.prototype.end = async function (customDtoIn) {
  try {
    return await this.progressAppClient.post(PROGRESS_USE_CASE_MAP.end, {
      code: this.code,
      lockSecret: this.lockSecret,
      ...customDtoIn,
    });
  } catch (e) {
    uuConsole.warning(objectToUu5String(e, "progress/end failed"));
  }
};

UuProgress.prototype.releaseLock = async function () {
  try {
    return await this.progressAppClient.post(PROGRESS_USE_CASE_MAP.releaseLock, {
      code: this.code,
    });
  } catch (e) {
    uuConsole.warning(objectToUu5String(e, "progress/releaseLock failed"));
  }
};

UuProgress.prototype.setState = async function (customDtoIn) {
  try {
    return await this.progressAppClient.post(PROGRESS_USE_CASE_MAP.setState, {
      code: this.code,
      ...customDtoIn,
    });
  } catch (e) {
    uuConsole.warning(objectToUu5String(e, "progress/setState failed"));
  }
};

UuProgress.prototype.delete = async function () {
  try {
    return await this.progressAppClient.post(PROGRESS_USE_CASE_MAP.delete, {
      code: this.code,
    });
  } catch (e) {
    uuConsole.warning(objectToUu5String(e, "progress/delete failed"));
  }
};

UuProgress.prototype.handleError = async function (e) {
  await this.failed(e);
  await this.release();
};
//@@viewOff:UuProgress

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
    uuConsole.info(objectToUu5String(dtoIn, "HDS6 - Calling ticket/create with dtoIn:"));
    createdTicket = await sprintManClient.post("ticket/create", dtoIn);
  } catch (e) {
    console.error(`HDS6 - Calling ticket/create with dtoIn: ${JSON.stringify(dtoIn)}`);
    await uuConsole.error(objectToUu5String(e, `Calling ticket/create failed  for ticket ${dtoIn.name}.`));
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

function objectToUu5String(obj, header = "") {
  let result;
  let body = "<uu5string.pre>" + JSON.stringify(obj, " ", 2) + "</uu5string.pre>";

  result = `<uu5string/>
    <UU5.Bricks.Section header="${header}">
      <UU5.CodeKit.CodeViewer codeStyle="json">${body}</UU5.CodeKit.CodeViewer>
    </UU5.Bricks.Section>
  `;

  return result;
}

const dtoOut = { dtoIn, itemList: [] };

async function main() {
  await uuConsole.info(objectToUu5String(dtoIn, "Script started with dtoIn"));
  const hollySession = await getSession(SPRINTMAN_OIDC_URI, HOLLY_CREDENTIALS.username, HOLLY_CREDENTIALS.password);

  // HDS 1 - Validation of dtoIn
  dtoOut.uuAppErrorMap = validateDtoIn(dtoIn);

  // HDS 2 - Create uuProgress
  uuProgress = new UuProgress({
    code: "ImportSprintmanTicketsProgress",
    name: "Import Sprintman Tickets Progress",
    consoleBaseUri: dtoIn.consoleBaseUri,
    session: hollySession,
  });

  // HDS 3 - Get or create progress
  let progress = await uuProgress.getOrCreate({
    authorizationStrategy: "roleGroupInterface",
    authorizationUriMap: {
      Authorities: "urn:uu:GGPLUS4U",
    },
  });
  await uuConsole.info("Progress exists and will be used.");

  // HDS 4 - Start progress
  await uuProgress.start({
    doneWork: 0,
    message: "Script has started. Obtaining tickets from attachment.",
  });

  //HDS 5 - Load data from resource
  await uuConsole.info(`HDS5 - Get data from attachmentUri: ${dtoIn.attachmentUri}`);

  let ticketList;
  try {
    let getScriptResponse = await AppClient.get(dtoIn.attachmentUri, null, { session, enableStreamApi: true });
    ticketList = await readReqBody(getScriptResponse.data, true);
  } catch (e) {
    await uuConsole.error(objectToUu5String(e, "Get data from attachment failed."));
    await uuProgress.end({
      state: "completedWithError",
      message: "Get data from attachment failed.",
      doneWork: 0,
    });
  }

  await uuProgress.proceed({
    code: "ImportSprintmanTicketsProgress",
    totalWork: ticketList.length + 1,
    doneWork: 1,
    message: "Tickets successfully obtained from attachment.",
  });

  // HDS 6 - Create tickets in Sprintman
  const sprintManClient = new AppClient({ baseUri: dtoIn.sprintmanBaseUri, session: hollySession });

  for (let i = 0; i < ticketList.length; i++) {
    try {
      let createdTicket = (await callTicketCreate(ticketList[i], dtoIn.sprintId, sprintManClient)).data;
      dtoOut.itemList.push(createdTicket);
      await uuProgress.proceed({
        code: "ImportSprintmanTicketsProgress",
        totalWork: ticketList.length + 1,
        doneWork: 2 + i,
        message: `Ticket ${i + 1} from ${ticketList.length} was successfully imported.`,
      });
    } catch (e) {
      await uuConsole.error(objectToUu5String(e, "Tickets importing failed."));
      await uuProgress.end({
        state: "completedWithError",
        message: "Tickets importing failed.",
        doneWork: 1 + i,
      });
    }
  }

  uuConsole.info("Script has completed successfully.");
  await uuProgress.end({
    state: "completed",
    message: "Script has completed successfully.",
  });

  //HDS 4
  return dtoOut;
}

main();
