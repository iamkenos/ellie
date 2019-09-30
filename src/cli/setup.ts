import * as ejs from "ejs";
import * as prettier from "prettier";
import * as fs from "fs-extra";
import * as inquirer from "inquirer";
import * as path from "path";

import * as logger from "../logger";

import {
  CONFIG_HELPER_INTRO,
  CONFIG_HELPER_SUCCESS_MESSAGE,
  CONFIG_INQUIRY,
  CORE_STEP_DEFS,
  LCL_CONFIG_OUT,
  LCL_CONFIG_TPL,
  PRETTIER_CONFIG,
  SAMPLES_DIR,
  SAMPLES_HELPER_SUCCESS_MESSAGE,
  SAMPLES_INQUIRY,
  WDIO_CONFIG_OUT,
  WDIO_CONFIG_TPL
} from "./config";
import { buildConfig, inspect, readFileSync, resolveComparableOutDirs, resolveFiles } from "./utils";

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
  fs.outputFileSync(outFile, prettier.format(renderedTpl, renderedFmt));

  logger.trace("Finished!");
  return outFile;
}

export async function generateSamples(): Promise<any> {
  logger.debug("Started samples helper");

  const outDir = (await inquirer.prompt(SAMPLES_INQUIRY) as any).outDir;
  const configOut = `${outDir}/${LCL_CONFIG_OUT}`;
  const parsedAnswers = buildConfig();

  createFromTemplate(parsedAnswers, LCL_CONFIG_TPL, path.join(process.cwd(), configOut));
  fs.copySync(path.join(__dirname, SAMPLES_DIR), path.join(process.cwd(), outDir), { recursive: true });
  console.log(SAMPLES_HELPER_SUCCESS_MESSAGE.trim().replace(LCL_CONFIG_OUT, configOut));

  process.exit(0);
}

export async function createLocalConfig(): Promise<any> {
  try {
    logger.debug("Started config helper");
    console.log(CONFIG_HELPER_INTRO.trim());

    const answers = await inquirer.prompt(CONFIG_INQUIRY);
    const parsedAnswers = buildConfig(answers);

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

    const answers = buildConfig(require(configFile).config, overrides);
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
