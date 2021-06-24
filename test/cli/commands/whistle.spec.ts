import * as fs from "fs-extra";
import * as path from "path";
import { generateSamples } from "@src/cli/commands/whistle";
import { readFileSync } from "@src/cli/utils";
import {
  RESOURCES_DIR,
  SAMPLES_DIR,
  SAMPLES_TS_CONFIG_FILE
} from "@src/cli/config";

jest.mock("@src/cli/utils", () => ({
  readFileSync: jest.fn()
}));

jest.mock("fs-extra", () => ({
  // @ts-ignore
  ...jest.requireActual("fs-extra"),
  existsSync: jest.fn(),
  copySync: jest.fn()
}));

describe("cli/commands/whistle", () => {
  const SPY_CONSOLE_LOG = jest.spyOn(console, "log");
  // @ts-ignore
  const SPY_PROCESS_EXIT = jest.spyOn(process, "exit").mockImplementation((code: number) => code as never);
  const source = path.join(process.cwd(), "src", "cli", RESOURCES_DIR, SAMPLES_DIR);
  const target = path.join(process.cwd(), SAMPLES_DIR);
  const tscSource = path.join(process.cwd(), "src", "cli", RESOURCES_DIR, SAMPLES_TS_CONFIG_FILE);
  const tscTarget = path.join(process.cwd(), SAMPLES_TS_CONFIG_FILE);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should allow creating sample files from the demo files: tsconfig not yet existing", () => {
    generateSamples();
    expect((fs.copySync as any as jest.Mock)).toBeCalledTimes(2);
    expect((fs.copySync as any as jest.Mock)).toHaveBeenNthCalledWith(1, source, target, { recursive: true });
    expect((fs.copySync as any as jest.Mock)).toHaveBeenNthCalledWith(2, tscSource, tscTarget, { overwrite: false });
    expect(SPY_CONSOLE_LOG.mock.calls).toMatchSnapshot();
    expect(SPY_PROCESS_EXIT).toHaveBeenCalledWith(0);
  });

  it("should allow creating sample files from the demo files: tsconfig already existing", () => {
    const tsc = path.join(process.cwd(), "build", "cli", RESOURCES_DIR, SAMPLES_TS_CONFIG_FILE);
    (fs.existsSync as any as jest.Mock).mockReturnValue(true);
    (readFileSync as any as jest.Mock).mockImplementation(() => jest.requireActual("@src/cli/utils").readFileSync(tsc));
    generateSamples();
    expect((fs.copySync as any as jest.Mock)).toBeCalledTimes(1);
    expect((fs.copySync as any as jest.Mock)).toHaveBeenNthCalledWith(1, source, target, { recursive: true });
    expect(SPY_CONSOLE_LOG.mock.calls).toMatchSnapshot();
    expect(SPY_PROCESS_EXIT).toHaveBeenCalledWith(0);
  });

  it("should throw an error when something goes wrong while generating the samples", async() => {
    (fs.existsSync as any as jest.Mock).mockImplementation(() => { throw new Error(); });
    let error: Error;

    try {
      generateSamples();
    } catch (e) {
      error = e;
    } finally {
      // @ts-ignore
      expect(error).toBeDefined();
    }
  });
});
