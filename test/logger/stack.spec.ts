import Stack from "@src/logger/stack";

describe("logger/stack", () => {
  const foobar = (normalize: boolean) => Stack.getCaller(normalize, 1);

  it("should be able to get the calling function name", () => {
    expect(Stack.getCaller()).toEqual("completed()");
  });

  it("should be able to get the normalized calling function name", () => {
    expect(Stack.getCaller(true)).toEqual("Completed");
  });

  it("should be able to get the calling function name by providing a stack level", () => {
    expect(foobar(false)).toEqual("foobar()");
  });

  it("should be able to get the calling file", () => {
    expect(Stack.getCallerFile()).toEqual("build/utils/completed():");
  });
});
