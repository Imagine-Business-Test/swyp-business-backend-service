import { Workspace } from "../../../src/domain";
import { Form } from "../../../src/domain";

const loggedInUser = { name: "Ossaija ThankGod", email: "codebugsolved@gmail.com" };
const date = new Date();

const workstation = new Workspace(
  "Account Openning", "1234", loggedInUser, loggedInUser, false, "4321", date, date
);

describe("Domain :: Workstation", () => {
  describe("#constructor", () => {
    test("It is a constructor", () => {
      expect(typeof Workspace).toBe("function");
    });
  });

  describe("#createForm", () => {
    test("It creates a new form", () => {

      const workstation = new Workspace(
        "Account Openning", "1234", loggedInUser, loggedInUser, false, "4321"
      );

      const content = "<h1>hello open account</h1>";
      const form = workstation.createForm("open account", content, loggedInUser);

      expect(form instanceof Form).toBeTruthy();
      expect(form).toEqual(expect.objectContaining({
        name: "open account",
        content,
        status: "active",
        deleted: false,
        workstation: "4321"
      }));
    });
  });

  describe("#getName", () => {
    test("It return name of workstation", () => {
      expect(workstation.getName()).toBe("Account Openning");
    });
  });

  describe("#lastModifier", () => {
    test("It return last user that modified form", () => {
      expect(workstation.getLastModifier()).toEqual(loggedInUser);
    });
  });

  describe("#creator", () => {
    test("It return form creator", () => {
      expect(workstation.getCreator()).toEqual(loggedInUser);
    });
  });

  describe("#isDeleted", () => {
    test("It return deleted property of form", () => {
      expect(workstation.isDeleted()).toBeFalsy();
    });
  });

  describe("#getBusinessId", () => {
    test("It return deleted property of form", () => {
      expect(workstation.getBusinessId()).toBe("1234");
    });
  });

  describe("#getCreationDate", () => {
    test("Is an instance of a date", () => {
      expect(workstation.getCreationDate() instanceof Date).toBeTruthy();
    });
  });

  describe("#getLastUpdateDate", () => {
    test("Is an instance of a date", () => {
      expect(workstation.getLastUpdateDate() instanceof Date).toBeTruthy();
    });
  });
});
