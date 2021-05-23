import { existsSync } from "fs";
import run from "@src/cli/run";
import { createLocalConfig, createWdioConfig } from "@src/cli/commands/init";
import { generateSamples } from "@src/cli/commands/whistle";
import { endureAndSurvive } from "@src/cli/commands/babygirl";

jest.mock("@src/cli/commands/init");
jest.mock("@src/cli/commands/whistle");
jest.mock("@src/cli/commands/babygirl");
jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  existsSync: jest.fn()
}));

describe("cli/run", () => {
  // @ts-ignore
  const SPY_PROCESS_EXIT = jest.spyOn(process, "exit").mockImplementation((code: number) => code as never);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should show the usage guide when no arguments are passed", () => {
    const args = {
      argv: {
        _: []
      },
      showHelp: jest.fn().mockImplementation(() => true)
    };

    try {
      run(args);
    } catch (e) {
    } finally {
      expect(createLocalConfig as any as jest.Mock).not.toHaveBeenCalled();
      expect(generateSamples as any as jest.Mock).not.toHaveBeenCalled();
      expect(createWdioConfig as any as jest.Mock).not.toHaveBeenCalled();
      expect(SPY_PROCESS_EXIT).toHaveBeenCalledWith(0);
    }
  });

  it("should run the babygirl command when given", () => {
    const args = {
      argv: {
        _: ["babygirl"]
      }
    };
    run(args);
    expect(endureAndSurvive as any as jest.Mock).toHaveBeenCalledTimes(1);
  });

  it("should run the init command when given", () => {
    const args = {
      argv: {
        _: ["init"]
      }
    };
    run(args);
    expect(createLocalConfig as any as jest.Mock).toHaveBeenCalledTimes(1);
  });

  it("should run the whistle command when given", () => {
    const args = {
      argv: {
        _: ["whistle"]
      }
    };
    run(args);
    expect(generateSamples as any as jest.Mock).toHaveBeenCalledTimes(1);
  });

  it("should parse the local config when the provided local config file is existing", () => {
    (existsSync as any as jest.Mock).mockReturnValue(true);
    const args = {
      argv: {
        _: ["foobar"],
        logLevel: "trace"
      }
    };
    run(args);
    expect(createWdioConfig as any as jest.Mock).toHaveBeenCalledTimes(1);
    expect(createWdioConfig as any as jest.Mock).toHaveBeenCalledWith("foobar", { logLevel: "trace" });
  });

  it("should start the config helper when the provided local config file isn't existing", () => {
    (existsSync as any as jest.Mock).mockReturnValueOnce(false);
    const args = {
      argv: {
        _: ["foobar"],
        logLevel: "trace"
      }
    };
    run(args);
    expect(createLocalConfig as any as jest.Mock).toHaveBeenCalledTimes(1);
  });

  it("should not start the config helper when the provided local config file is existing", () => {
    (existsSync as any as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const args = {
      argv: {
        _: ["foobar"],
        logLevel: "trace"
      }
    };
    run(args);
    expect(createLocalConfig as any as jest.Mock).not.toHaveBeenCalled();
  });
});
