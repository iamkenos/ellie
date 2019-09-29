import * as ejs from "ejs";
import * as prettier from "prettier";
import * as fs from "fs";
import * as inquirer from "inquirer";
import * as path from "path";

import * as logger from "../logger";

import {
  CONFIG_HELPER_INTRO,
  CONFIG_HELPER_SUCCESS_MESSAGE,
  CORE_STEP_DEFS,
  DEFAULT,
  LCL_CONFIG_OUT,
  LCL_CONFIG_TPL,
  PRETTIER_CONFIG,
  QUESTIONNAIRE,
  WDIO_CONFIG_OUT,
  WDIO_CONFIG_TPL
} from "./config";
import { inspect, readFileSync, resolveComparableOutDirs, resolveFiles } from "./utils";

function createFromTemplate(answers: any, template: string, outFile: string): string {
  logger.trace("Creating from template...");

  const fmt = readFileSync(path.join(__dirname, PRETTIER_CONFIG));
  const renderedFmt = { ...JSON.parse(fmt), parser: "babel" };

  const tpl = readFileSync(path.join(__dirname, template));
  const renderedTpl = ejs.render(tpl, { answers });

  if (fs.existsSync(outFile)) {
    logger.trace("Deleting existing file %s", outFile);
    fs.unlinkSync(outFile);
  }

  logger.trace("Writing to file %s", outFile);
  fs.writeFileSync(outFile, prettier.format(renderedTpl, renderedFmt));

  logger.trace("Finished!");
  return outFile;
}

export async function createLocalConfig(): Promise<any> {
  try {
    logger.debug("Started config helper");
    console.log(CONFIG_HELPER_INTRO.trim());

    // create answers object to be used in filling up the template
    // ...DEFAULT - first, use the defaults as a base to include properties that are not inquired by the helper
    // ...answers - then take values from the provided config helper
    const arrSplit = new RegExp(/[ ,]+/);
    const answers = await inquirer.prompt(QUESTIONNAIRE);
    const parsedAnswers = {
      ...DEFAULT,
      ...answers,
      pages: answers.pages.toString().split(arrSplit),
      specs: answers.specs.toString().split(arrSplit),
      steps: answers.steps.toString().split(arrSplit)
    };

    logger.info("Creating local config...", LCL_CONFIG_OUT);
    createFromTemplate(parsedAnswers, LCL_CONFIG_TPL, path.join(process.cwd(), LCL_CONFIG_OUT));
    console.log(CONFIG_HELPER_SUCCESS_MESSAGE.trim());

    process.exit(0);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

export function createWdioConfig(source: string, overrides: any): string {
  try {
    logger.info("Creating wdio config from %s...", source);

    const configFile = path.join(process.cwd(), source);
    const configDir = path.dirname(configFile);

    // create answers object to be used in filling up the template
    // ...DEFAULT - first, use the defaults as a base to include properties that are not supplied on the local config
    // ...require(configFile).config - then take values from the provided config file and replace the defaults
    // ...overrides - lastly, use overrides if it matches any of the cli options
    const answers = { ...DEFAULT, ...require(configFile).config, ...overrides };
    const parsedAnswers = {
      ...answers,
      directory: configDir,
      comparableOptions: resolveComparableOutDirs(configDir, answers.comparableOptions),
      pages: resolveFiles(configDir, answers.pages),
      specs: resolveFiles(configDir, answers.specs),
      steps: [...resolveFiles(__dirname, [CORE_STEP_DEFS]), ...resolveFiles(configDir, answers.steps, false)],
      reportOutDir: path.join(configDir, answers.reportOutDir)
    };

    logger.setLevel(parsedAnswers.logLevel);

    const file = createFromTemplate(parsedAnswers, WDIO_CONFIG_TPL, path.join(configDir, WDIO_CONFIG_OUT));

    logger.trace("Raw config:\n%s", inspect(answers));
    logger.trace("Effective config:\n%s", inspect(require(file).config));

    return file;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}
