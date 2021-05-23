import { start } from "@src/cli";
import runCLI from "@src/cli/run";
import runCore from "@src/core/run";

jest.mock("@src/cli/run");
jest.mock("@src/core/run");

describe("cli", () => {
  // @ts-ignore
  const SPY_PROCESS_EXIT = jest.spyOn(process, "exit").mockImplementation((code: number) => code as never);

  it("should expose a function for running commands and running the core feature", async() => {
    await start();
    expect(runCLI as any as jest.Mock).toHaveBeenCalledTimes(1);
    expect(runCore as any as jest.Mock).toHaveBeenCalledTimes(1);
  });

  it("should exit 1 when something goes wrong while the cli runs", async() => {
    (runCLI as any as jest.Mock).mockImplementation(() => { throw new Error(); });

    try {
      await start();
    } catch (e) {
    } finally {
      expect(SPY_PROCESS_EXIT).toHaveBeenCalledWith(1);
    }
  });
});
