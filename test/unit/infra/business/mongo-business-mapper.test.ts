import { MongoBusinessMapper } from "../../../../src/infra/business";
import { BusinessInterface } from "../../../../src/contracts/infra";

describe("Infra :: Business :: MongoBusinessMapper ", () => {
  test("It is an object", () => {
    expect(typeof MongoBusinessMapper).toBe("object");
  });

  // describe("toEntity", () => {
  //   const businessRow = {
  //     name: "First Bank",
  //     logoUrl: "https://www.firstbank.com/logo.jpg",
  //     accounts: [],
  //     _id: "12334454",
  //     increment: () => {},
  //     model: {},
  //     isDeleted: false,
  //     remove: () => {},
  //     save: () => {}
  //   };
  //   const entity = MongoBusinessMapper.toEntity(businessRow);
  // });
});
