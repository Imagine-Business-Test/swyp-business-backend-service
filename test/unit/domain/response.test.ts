import { Response } from "../../../src/domain";
import { IResponseContent, INote } from "../../../src/contracts/domain";
const content: IResponseContent = {
  position: 1,
  questionType: "string",
  question: "string",
  answer: "Ok thanks for the form"
};

const branch = "Apapa";

const respondant = {
  firstname: "ThankGod",
  lastname: "Ossaija",
  email: "codebugsolved@gmail.com",
  phone: "08136868448",
  id: "123456"
};

const loggedInUser = {
  name: "Ossaija ThankGod",
  email: "codebugsolved@gmail.com"
};

const note: INote = {
  note: "New Note",
  notedBy: loggedInUser,
  date: new Date()
};

const form = {
  id: "13223i23",
  business: "12345",
  workspace: "12346",
  name: "ddo"
};

const date = new Date();
const res = new Response(
  respondant,
  branch,
  form,
  [content],
  "pending",
  false,
  "4321",
  [note],
  loggedInUser,
  date,
  date
);

describe("Domain :: Response", () => {
  describe("#constructor", () => {
    test("It is a constructor function", () => {
      expect(typeof Response).toBe("function");
    });
  });

  describe("#isDeleted", () => {
    test("It return deleted property of reponse", () => {
      expect(res.isDeleted()).toBeFalsy();
    });
  });

  describe("#getCreationDate", () => {
    test("Is an instance of a date", () => {
      expect(res.getCreationDate() instanceof Date).toBeTruthy();
    });
  });

  describe("#getLastUpdateDate", () => {
    test("Is an instance of a date", () => {
      expect(res.getLastMoficationDate() instanceof Date).toBeTruthy();
    });
  });

  describe("#getRespondant", () => {
    test("Return the respondant that submitted the response", () => {
      expect(res.getRespondant()).toEqual(expect.objectContaining(respondant));
    });
  });

  describe("#getBranch", () => {
    test("Return the branch where response should be processed", () => {
      expect(res.getBranch()).toBe(branch);
    });
  });

  describe("#getContent", () => {
    test("Return the respondant that submitted the response", () => {
      expect(res.getContent()).toEqual(expect.arrayContaining([content]));
    });
  });

  describe("#getStatus", () => {
    test("Return the respondant that submitted the response", () => {
      expect(res.getStatus()).toBe("pending");
    });
  });

  describe("#getFormId", () => {
    test("Return the form id the response belongs to", () => {
      expect(res.getForm()).toEqual(expect.objectContaining(form));
    });
  });

  describe("#getId", () => {
    test("Return the id of the response", () => {
      expect(res.getId()).toBe("4321");
    });
  });
});
