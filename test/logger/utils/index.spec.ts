import { normalizeFunctionName } from "@src/logger/utils";

describe("logger/utils", () => {
  it("should normalize a function name", () => {
    expect(normalizeFunctionName("foobar()")).toEqual("Foobar");
  });
});
