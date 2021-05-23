import { ExpectedConditionsError } from "@src/exceptions";

describe("exceptions", () => {
  it("should expose an ExpectedConditionsError", () => {
    const error = new ExpectedConditionsError("foobar");
    expect(error).toMatchSnapshot();
  });
});
