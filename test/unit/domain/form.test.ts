/* tslint:disable: no-shadowed-variable */
import { Form, Response } from "../../../src/domain";

const loggedInUser = {
  name: "Ossaija ThankGod",
  email: "codebugsolved@gmail.com"
};

const branch = "Apapa";

const content = "<h1>Hello world</h1>";
const date = new Date();
const business = { id: "1234", name: "firstbank" };
const workspace = { id: "1233", name: "Account Opening", parent: "Corprate" };
const form = new Form(
  "Open Account",
  "Open-Account",
  workspace,
  business,
  content,
  "active",
  4,
  loggedInUser,
  loggedInUser,
  false,
  "4321",
  date,
  date
);

describe("Domain :: Form", () => {
  describe("#constructor", () => {
    test("It is a constructor function", () => {
      expect(typeof Form).toBe("function");
    });
  });

  describe("#createResponse", () => {
    test("It record new form respnse", () => {
      const content = "<p>Ok thanks for the form</p>";
      const respondant = {
        firstname: "ThankGod",
        lastname: "Ossaija",
        email: "codebugsolved@gmail.com",
        phone: "08136868448",
        id: "123456"
      };

      const response = form.createResponse(content, respondant, branch);

      expect(response instanceof Response).toBeTruthy();
      expect(response).toEqual(
        expect.objectContaining({
          content,
          branch,
          respondant,
          form: {
            id: "4321",
            business: business.id,
            name: "Open Account"
          },
          status: "pending",
          deleted: false
        })
      );
    });
  });

  describe("#getElementCount", () => {
    test("It returns the number of elements in a form", () => {
      expect(form.getElementCount()).toBe(4);
    });
  });

  describe("#lastModifier", () => {
    test("It return the last user to modify a form", () => {
      expect(form.getLastModifier()).toEqual(
        expect.objectContaining(loggedInUser)
      );
    });
  });

  describe("#getCreator", () => {
    test("It return the creator of the form", () => {
      expect(form.getCreator()).toEqual(expect.objectContaining(loggedInUser));
    });
  });

  describe("#getCreationDate", () => {
    test("Is an instance of a date", () => {
      expect(form.getCreationDate() instanceof Date).toBeTruthy();
    });
  });

  describe("#getLastUpdateDate", () => {
    test("Is an instance of a date", () => {
      expect(form.getLastUpdateDate() instanceof Date).toBeTruthy();
    });
  });

  describe("#getWorkstation", () => {
    test("It return the workstation of the form ", () => {
      expect(form.getWorkspace()).toEqual(expect.objectContaining(workspace));
    });
  });

  describe("#getStatus", () => {
    test("It return the workstation of the form ", () => {
      expect(form.getStatus()).toBe("active");
    });
  });

  describe("#getName", () => {
    test("It return the workstation of the form ", () => {
      expect(form.getName()).toBe("Open Account");
    });
  });

  describe("#getContent", () => {
    test("It return the workstation of the form ", () => {
      expect(form.getContent()).toBe(content);
    });
  });

  describe("#isDeleted", () => {
    test("It return deleted property of form", () => {
      expect(form.isDeleted()).toBeFalsy();
    });
  });
});
