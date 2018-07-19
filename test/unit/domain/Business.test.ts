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
const business = new Business(
  "GT Bank",
  "gb-bank",
  false,
  false,
  accounts,
  "http://ww.gtbank.com/logo",
  "1234"
);

describe("Domain :: Business", () => {
  describe("#contructor", () => {
    test(" It is a function", () => {
      expect(typeof Business).toBe("function");
    });
  });

  describe("#getName", () => {
    test("It is a function", () => {
      expect(typeof business.getName).toBe("function");
    });

    test("Return name of business", () => {
      expect(business.getName()).toBe("GT Bank");
    });
  });

  describe("#getLogo", () => {
    test("It is a function", () => {
      expect(typeof business.getLogo).toBe("function");
    });

    test("Return business logo", () => {
      expect(business.getLogo()).toBe("http://ww.gtbank.com/logo");
    });
  });

  describe("#setUser", () => {
    test("It throw an error when authorized user try to log in", () => {
      const biz = new Business(
        "GT Bank",
        "gb-bank",
        false,
        false,
        [],
        "http://ww.gtbank.com/logo",
        "1234"
      );
      expect(() => {
        biz.setUser(user);
      }).toThrow(`${user.name} does not belong to GT Bank`);
    });

    test("It sets logged in user from business accounts", () => {
      business.setUser(user);

      expect(business.setUser(user)).toBeTruthy();
    });
  });

  describe("#getUser", () => {
    test("It return the logged in user", () => {
      business.setUser(user);
      const result = business.getUser();
      expect(result).toEqual(expect.objectContaining(user));
    });
  });

  describe("#createWorkspace", () => {
    test("It creates a work space", () => {
      business.setUser(user);
      const workspace = business.createWorkspace("Account Opening");

      expect(workspace).toEqual(
        expect.objectContaining({
          name: "Account Opening",
          lastModifier: { name: user.name, email: user.email },
          creator: { name: user.name, email: user.email },
          business: { id: business.getId(), name: business.getSlug() },
          deleted: false
        })
      );
    });
  });
});
