
import * as fs from "fs-extra";
import * as path from "path";

import logger from "../../logger";
import {
  RESOURCES_DIR,
  SAMPLES_DIR,
  SAMPLES_HELPER_SUCCESS_MESSAGE,
  SAMPLES_HELPER_TS_CONFIG_EXISTS_MESSAGE,
  SAMPLES_TS_CONFIG_FILE
} from "../config";
import { readFileSync } from "../utils";

export function generateSamples(): void {
  try {
    const source = path.join(__dirname, "../", RESOURCES_DIR, SAMPLES_DIR);
    const target = path.join(process.cwd(), SAMPLES_DIR);

    const tscSource = path.join(__dirname, "../", RESOURCES_DIR, SAMPLES_TS_CONFIG_FILE);
    const tscTarget = path.join(process.cwd(), SAMPLES_TS_CONFIG_FILE);

    fs.copySync(source, target, { recursive: true });
    if (fs.existsSync(tscTarget)) {
      console.log(SAMPLES_HELPER_TS_CONFIG_EXISTS_MESSAGE.trim());
      console.log(readFileSync(tscSource));
    } else fs.copySync(tscSource, tscTarget, { overwrite: false });

    console.log(SAMPLES_HELPER_SUCCESS_MESSAGE.trim());
    process.exit(0);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}
