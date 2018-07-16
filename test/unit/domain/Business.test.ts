import { Business } from "../../../src/domain";

const accounts = [];
const user = {
  phone: "08136868448",
  email: "codebugsolved@gmail.com",
  name: "Ossaija ThankGod",
  password: "princtg",
  role: "admin"
};
accounts.push(user);
const business = { id: "1234", name: "firstbank" };

describe("Domain :: Business", () => {
  describe("#contructor", () => {
    test(" It is a function", () => {
      expect(typeof Business).toBe("function");
    });
  });

  describe("#getName", () => {
    test("It is a function", () => {
      const business = new Business("GT Bank", "http://ww.gtbank.com/logo", []);
      expect(typeof business.getName).toBe("function");
    });

    test("Return name of business", () => {
      const business = new Business("GT Bank", "http://ww.gtbank.com/logo", []);
      expect(business.getName()).toBe("GT Bank");
    });
  });

  describe("#getLogo", () => {
    test("It is a function", () => {
      const business = new Business("GT Bank", "http://ww.gtbank.com/logo", []);
      expect(typeof business.getLogo).toBe("function");
    });

    test("Return business logo", () => {
      const business = new Business("GT Bank", "http://ww.gtbank.com/logo", []);
      expect(business.getLogo()).toBe("http://ww.gtbank.com/logo");
    });
  });

  describe("#setUser", () => {
    test("It throw an error when authorized user try to log in", () => {
      const business = new Business(
        "GT Bank",
        "http://www.gtbank.com/logo",
        []
      );

      expect(() => {
        business.setUser(user);
      }).toThrow(`${user.name} does not belong to GT Bank`);
    });

    test("It sets logged in user from business accounts", () => {
      const business = new Business(
        "GT Bank",
        "http://www.gtbank.com/logo",
        accounts
      );
      business.setUser(user);

      expect(business.setUser(user)).toBeTruthy();
    });
  });

  describe("#getUser", () => {
    test("It return the logged in user", () => {
      const business = new Business(
        "First Bank",
        "http://ww.firstbank.ng",
        accounts
      );
      business.setUser(user);
      const result = business.getUser();
      expect(result).toEqual(expect.objectContaining(user));
    });
  });

  describe("#createWorkspace", () => {
    test("It creates a work space", () => {
      const business = new Business(
        "First Bank",
        "http://ww.firstbank.ng",
        accounts,
        "1234"
      );
      business.setUser(user);
      const workspace = business.createWorkspace("Account Opening");

      expect(workspace).toEqual(
        expect.objectContaining({
          name: "Account Opening",
          lastModifier: { name: user.name, email: user.email },
          creator: { name: user.name, email: user.email },
          business: { id: business.getId(), name: business.getName() },
          deleted: false
        })
      );
    });
  });
});
