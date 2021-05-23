import Stack from "@src/logger/stack";

describe("logger/stack", () => {
  const foobar = (normalize: boolean) => Stack.getCaller(normalize, 1);

  it("should be able to get the calling function name", () => {
    expect(Stack.getCaller()).toEqual("asyncJestTest()");
  });

  it("should be able to get the normalized calling function name", () => {
    expect(Stack.getCaller(true)).toEqual("Async Jest Test");
  });

  it("should be able to get the calling function name by providing a stack level", () => {
    expect(foobar(false)).toEqual("foobar()");
  });

  it("should be able to get the calling file", () => {
    expect(Stack.getCallerFile()).toEqual("build/jasmineAsyncInstall/asyncJestTest():");
  });
});
