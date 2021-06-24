import * as fs from "fs-extra";
import * as inquirer from "inquirer";
import * as path from "path";
import { existsSync } from "fs";
import { readFileSync, resolveFiles } from "@src/cli/utils";
import { createLocalConfig, createWdioConfig } from "@src/cli/commands/init";
import { CONFIG_LOCAL_OUT_FILE, CONFIG_LOCAL_TPL_FILE, CONFIG_WDIO_TPL_FILE } from "@src/cli/config";

jest.mock("@src/cli/utils", () => ({
  // @ts-ignore
  ...jest.requireActual("@src/cli/utils"),
  readFileSync: jest.fn(),
  resolveFiles: jest.fn()
}));
jest.mock("fs-extra", () => ({
  // @ts-ignore
  ...jest.requireActual("fs-extra"),
  existsSync: jest.fn(),
  unlinkSync: jest.fn()
}));
jest.mock("inquirer");
jest.mock("process");

describe("cli/commands/init", () => {
  const SPY_CONSOLE_LOG = jest.spyOn(console, "log");
  // @ts-ignore
  const SPY_PROCESS_EXIT = jest.spyOn(process, "exit").mockImplementation((code: number) => code as never);
  const configPath = path.join(process.cwd(), CONFIG_LOCAL_OUT_FILE);
  const deleteConfig = () => jest.requireActual("fs-extra").unlinkSync(configPath);
  const fmt = fs.readFileSync(path.join(process.cwd(), ".prettierrc"));
  const localtpl = fs.readFileSync(path.join(process.cwd(), "src", "cli", CONFIG_LOCAL_TPL_FILE), "utf-8");
  const wdiotpl = fs.readFileSync(path.join(process.cwd(), "src", "cli", CONFIG_WDIO_TPL_FILE), "utf-8");
  const args = {
    baseUrl: "foo-bar.com",
    logLevel: "info",
    maxInstances: "69",
    meta: "./demo/test/**/*.meta.ts",
    specs: "./demo/test/**/*.feature",
    steps: "./demo/test/**/*.def.ts",
    browserstackEnabled: false
  };

  afterEach(() => {
    jest.resetAllMocks();

    try {
      deleteConfig();
    } catch (e) {

    }
  });

  it.each([
    { browserstackEnabled: true, browserstackLocal: false, user: "foo", key: "bar" },
    { browserstackEnabled: true, browserstackLocal: true, user: "foo", key: "bar" }
  ])("should allow creating a local config file: %o", async(ans) => {
    (inquirer.prompt as any as jest.Mock).mockResolvedValue({ ...args, ...ans });
    (readFileSync as any as jest.Mock).mockReturnValueOnce(fmt).mockReturnValueOnce(localtpl);
    (fs.existsSync as any as jest.Mock).mockReturnValue(true);
    await createLocalConfig();

    // check it deletes existing file
    expect(fs.unlinkSync).toHaveBeenCalled();

    // check it creates the file
    const config = fs.readFileSync(path.join(process.cwd(), CONFIG_LOCAL_OUT_FILE), "utf-8");
    expect(SPY_CONSOLE_LOG.mock.calls).toMatchSnapshot();
    expect(SPY_PROCESS_EXIT).toHaveBeenCalledWith(0);
    expect(config).toMatchSnapshot();
  });

  it("should throw an error when something goes wrong while creating a local config file", async() => {
    (inquirer.prompt as any as jest.Mock).mockRejectedValue({});
    let error: Error;

    try {
      await createLocalConfig();
    } catch (e) {
      error = e;
    } finally {
      // @ts-ignore
      expect(error).toBeDefined();
    }
  });

  it.each([
    { logLevel: "foobar" }
  ])("should allow parsing of the local config file: %o", async(overrides) => {
    (inquirer.prompt as any as jest.Mock).mockResolvedValue(args);
    (readFileSync as any as jest.Mock).mockReturnValueOnce(fmt).mockReturnValueOnce(localtpl);
    await createLocalConfig();
    (readFileSync as any as jest.Mock).mockReturnValueOnce(fmt).mockReturnValueOnce(wdiotpl);
    (resolveFiles as any as jest.Mock).mockReturnValue(["resolved/foo/bar"]);
    const config = createWdioConfig(CONFIG_LOCAL_OUT_FILE, overrides);
    expect(existsSync(config)).toBe(true);
    // TODO: maybe add a snapshot compare to config
  });
});
