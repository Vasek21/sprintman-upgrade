const { TestHelper } = require("uu_script_devkitg01");

describe("ImportTickets", () => {
  test("HDS", async () => {
    const session = await TestHelper.login();

    const dtoIn = {
      attachmentUri:
        "https://uuapp.plus4u.net/uu-dockit-maing02/7c91c19f9b2c4046a07393c829f64eb6/document/attachment/getData?code=264fd4960fb83cbd2194749d7eaa9bcc&documentId=638733c09de3330036bdf8c2",
      sprintmanBaseUri: "http://localhost:8080/uu-sprintman-maing01/00000503defc438abdf47d1ecd301c67/",
      consoleBaseUri: "http://localhost:9090/uu-console-maing02/33333333333333333333333333333332/",
      sprintId: "636a2e31156ed20038b8aa6d",
    };

    const result = await TestHelper.runScript("import-tickets.js", dtoIn, session);
    expect(result.isError).toEqual(false);
  });
});
