process.env.MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "something";
process.env.MAILGUN_SECRET = process.env.MAILGUN_SECRET || "something";
process.env.JSON_SECRET = process.env.JSON_SECRET || "something";
process.env.MONGO_URL = process.env.MONGO_URL || "something";

process.env.PORT = process.env.PORT || "2309";

import config  from "../../../src/config";

describe("Config :: process", () => {
  test("Its an object", () => {
    expect(typeof config.process).toBe("object");
  });

  it("It has a port property", () => {
    expect(typeof Number(config.process.port)).toBe("string");
  });

  it("It has a type property", () => {
    expect(typeof config.process.type).toBe("string");
  });

  it("It has an env property", () => {
    expect(typeof config.process.env).toBe("string");
  });
});

describe("Config :: web", () => {
  test("Its an object", () => {
    expect(typeof config.web).toBe("object");
  });

  test("It has a json_secret property", () => {
    expect(typeof config.web.json_secret).toBe("string");
  });
});

describe("Config :: mail", () => {
  test("Its an object", () => {
    expect(typeof config.mail).toBe("object");
  });

  test("It has a mailgun_domain property", () => {
    expect(typeof config.mail.domain).toBe("string");
  });

  test("It has a mailgun secret property", () => {
    expect(typeof config.mail.secret).toBe("string");
  });
});

describe("Confg :: DB", () => {
  test("It is an object", () => {
    expect(typeof config.db).toBe("object");
  });

  test("It has a mongo_url property", () => {
    expect(typeof config.db.mongo_url).toBe("string");
  });
});
