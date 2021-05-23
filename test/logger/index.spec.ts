import logger from "@src/logger";
import { DEFAULT_LEVEL, LEVELS } from "@src/logger/config";

describe("logger", () => {
  jest.useFakeTimers("modern").setSystemTime(new Date("2012-04-18").getTime());
  const SPY_CONSOLE_LOG = jest.spyOn(console, "log");
  const SPY_CONSOLE_ERR = jest.spyOn(console, "error");
  const SPY_CONSOLE_WARN = jest.spyOn(console, "warn");
  const SPY_CONSOLE_INFO = jest.spyOn(console, "info");
  const SPY_CONSOLE_DEBUG = jest.spyOn(console, "debug");
  const SPY_CONSOLE_TRACE = jest.spyOn(console, "trace");

  afterEach(() => {
    logger.setLevel(DEFAULT_LEVEL);
    jest.resetAllMocks();
  });

  it("should allow setting a valid log level", () => {
    LEVELS.forEach((i: string) => {
      logger.setLevel(i as any);
      expect(Object.keys(logger.logger.levels).find(k => k === i.toUpperCase())).toBeDefined();
    });
  });

  it("should deny setting an invalid log level", () => {
    // @ts-ignore
    logger.setLevel("foobar");
    expect(SPY_CONSOLE_WARN.mock.calls).toMatchSnapshot();
    expect(logger.logger.getLevel()).toEqual(3);
  });

  it.each(["silent", "error", "warn", "info", "debug", "trace"])("should expose the log level %s", (level: any) => {
    const MESSAGE = "foobar %s, %s";
    const ARGS = [6, 9];

    logger.setLevel(level);
    logger.error(MESSAGE, ...ARGS);
    logger.warn(MESSAGE, ...ARGS);
    logger.info(MESSAGE, ...ARGS);
    logger.debug(MESSAGE, ...ARGS);
    logger.trace(MESSAGE, ...ARGS);
    expect(SPY_CONSOLE_LOG.mock.calls).toMatchSnapshot();
    expect(SPY_CONSOLE_WARN.mock.calls).toMatchSnapshot();
    expect(SPY_CONSOLE_ERR.mock.calls).toMatchSnapshot();
    expect(SPY_CONSOLE_INFO.mock.calls).toMatchSnapshot();
    expect(SPY_CONSOLE_DEBUG.mock.calls).toMatchSnapshot();
    expect(SPY_CONSOLE_TRACE.mock.calls).toMatchSnapshot();
  });
});
