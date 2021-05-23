import {
  CONFIG_HELPER_INTRO,
  CONFIG_HELPER_SUCCESS_MESSAGE,
  CONFIG_INQUIRY,
  CONFIG_LOCAL_OUT_FILE,
  CONFIG_LOCAL_TPL_FILE,
  CONFIG_OPTIONS,
  CONFIG_WDIO_OUT_FILE,
  CONFIG_WDIO_TPL_FILE,
  CORE_STEP_DEFS_GLOB,
  DEFAULT,
  LOCAL_DATA_DIR,
  PRETTIER_SETTINGS_FILE,
  RESOURCES_DIR,
  SAMPLES_DIR,
  SAMPLES_HELPER_SUCCESS_MESSAGE,
  SAMPLES_HELPER_TS_CONFIG_EXISTS_MESSAGE,
  SAMPLES_TS_CONFIG_FILE,
  TLOU_QUOTES,
  USAGE
} from "@src/cli/config";

describe("cli/config", () => {
  it("should expose a default config", () => {
    expect(DEFAULT).toMatchSnapshot();
  });

  it("should expose fancy quotes", () => {
    expect(TLOU_QUOTES).toMatchSnapshot();
  });

  it("should expose a local data directory", () => {
    expect(LOCAL_DATA_DIR).toMatchSnapshot();
  });

  it("should expose a core step defs glob", () => {
    expect(CORE_STEP_DEFS_GLOB).toMatchSnapshot();
  });

  it("should expose a resources directory", () => {
    expect(RESOURCES_DIR).toMatchSnapshot();
  });

  it("should expose a prettier config file", () => {
    expect(PRETTIER_SETTINGS_FILE).toMatchSnapshot();
  });

  it("should expose a local config template file", () => {
    expect(CONFIG_LOCAL_TPL_FILE).toMatchSnapshot();
  });

  it("should expose a local output template file", () => {
    expect(CONFIG_LOCAL_OUT_FILE).toMatchSnapshot();
  });

  it("should expose a wdio config template file", () => {
    expect(CONFIG_WDIO_TPL_FILE).toMatchSnapshot();
  });

  it("should expose a wdio output template file", () => {
    expect(CONFIG_WDIO_OUT_FILE).toMatchSnapshot();
  });

  it("should expose a samples directory", () => {
    expect(SAMPLES_DIR).toMatchSnapshot();
  });

  it("should expose a samples tsconfig file", () => {
    expect(SAMPLES_TS_CONFIG_FILE).toMatchSnapshot();
  });

  it("should expose a config helper intro message", () => {
    expect(CONFIG_HELPER_INTRO).toMatchSnapshot();
  });

  it("should expose a config helper success message", () => {
    expect(CONFIG_HELPER_SUCCESS_MESSAGE).toMatchSnapshot();
  });

  it("should expose a samples helper success message", () => {
    expect(SAMPLES_HELPER_SUCCESS_MESSAGE).toMatchSnapshot();
  });

  it("should expose a samples helper tsconfig exists message", () => {
    expect(SAMPLES_HELPER_TS_CONFIG_EXISTS_MESSAGE).toMatchSnapshot();
  });

  it("should error when user doesn't provide a valid maxInstances value: string", () => {
    const responsesDir: any = CONFIG_INQUIRY.find(i => i.name === "maxInstances");
    expect(responsesDir.validate("foobar")).toEqual("This property is required, and should be a number greater than 0");
  });

  it("should error when user doesn't provide a valid maxInstances value: less than 1", () => {
    const responsesDir: any = CONFIG_INQUIRY.find(i => i.name === "maxInstances");
    expect(responsesDir.validate(0)).toEqual("This property is required, and should be a number greater than 0");
  });

  it("should not error when user provides a valid maxInstances value", () => {
    const responsesDir: any = CONFIG_INQUIRY.find(i => i.name === "maxInstances");
    expect(responsesDir.validate(1)).toEqual(true);
  });

  it("should ask for a browserstackLocal value when browserstackEnabled is true", () => {
    const answers = {
      browserstackEnabled: true
    };
    const browserstackLocal: any = CONFIG_INQUIRY.find(i => i.name === "browserstackLocal");
    expect(browserstackLocal.when(answers)).toEqual(true);
  });

  it("should ask for a user value when browserstackEnabled is true", () => {
    const answers = {
      browserstackEnabled: true
    };
    const user: any = CONFIG_INQUIRY.find(i => i.name === "user");
    expect(user.when(answers)).toEqual(true);
  });

  it("should ask for a key value when browserstackEnabled is true", () => {
    const answers = {
      browserstackEnabled: true
    };
    const key: any = CONFIG_INQUIRY.find(i => i.name === "key");
    expect(key.when(answers)).toEqual(true);
  });

  it("should expose the cli options", () => {
    expect(CONFIG_OPTIONS).toMatchSnapshot();
  });

  it("should expose the cli inquirer questions", () => {
    expect(CONFIG_INQUIRY).toMatchSnapshot();
  });

  it("should expose the cli usage message", () => {
    expect(USAGE).toMatchSnapshot();
  });
});
