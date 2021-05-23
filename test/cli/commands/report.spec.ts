import * as fs from "fs-extra";
import { execSync } from "child_process";
import { allure } from "@src/cli/commands/report";
import { readFileSync } from "@src/cli/utils";

jest.mock("@src/cli/utils", () => ({
  readFileSync: jest.fn()
}));

jest.mock("child_process", () => ({
  ...jest.requireActual("child_process"),
  execSync: jest.fn()
}));

jest.mock("fs-extra", () => ({
  ...jest.requireActual("fs-extra"),
  existsSync: jest.fn(),
  copySync: jest.fn()
}));

describe("cli/commands/report", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should open the allure report", () => {
    (fs.existsSync as any as jest.Mock).mockReturnValueOnce(true);
    (readFileSync as any as jest.Mock).mockReturnValueOnce(`{
      "specs": ["/far/far/qux.feature"],
      "allureHtmlDir": "/foo/bar/baz"
    }`);

    allure();
    expect(execSync).toHaveBeenCalledWith("npx allure open /foo/bar/baz");
  });

  it("should throw an error when the the data file isn't existing", async() => {
    (fs.existsSync as any as jest.Mock).mockReturnValueOnce(false);
    let error: Error;

    try {
      allure();
    } catch (e) {
      error = e;
    } finally {
      // @ts-ignore
      expect(error).toBeDefined();
      expect(execSync).not.toHaveBeenCalled();
    }
  });

  it("should throw an error when something goes wrong while opening the allure report", async() => {
    (fs.existsSync as any as jest.Mock).mockImplementation(() => { throw new Error(); });
    let error: Error;

    try {
      allure();
    } catch (e) {
      error = e;
    } finally {
      // @ts-ignore
      expect(error).toBeDefined();
    }
  });
});
