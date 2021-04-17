
import { execSync } from "child_process";
import { join } from "path";
import { existsSync } from "fs-extra";

import logger from "../../logger";
import { readFileSync } from "../../cli/utils";
import { CONFIG_WDIO_OUT_FILE, LOCAL_DATA_DIR } from "../config";

export function allure(): void {
  try {
    const file = join(LOCAL_DATA_DIR, CONFIG_WDIO_OUT_FILE);

    if (existsSync(file)) {
      const config = JSON.parse(readFileSync(join(LOCAL_DATA_DIR, CONFIG_WDIO_OUT_FILE)));
      execSync(`npx allure open ${config.allureHtmlDir}`);
    } else {
      throw new Error("Looks like something went wrong. See 'npx ellie --help' for a quick overview.");
    }
  } catch (e) {
    logger.error(e);
    throw e;
  }
}
