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
  CONFIG_LOCAL_OUT_FILE,
  CONFIG_LOCAL_TPL_FILE,
  CONFIG_WDIO_OUT_FILE,
  CONFIG_WDIO_TPL_FILE,
  CORE_STEP_DEFS_GLOB,
  PRETTIER_SETTINGS_FILE,
  RESOURCES_DIR,
  SAMPLES_DIR,
  SAMPLES_HELPER_SUCCESS_MESSAGE
} from "./config";
import { buildConfig, inspect, readFileSync, resolveComparableOutDirs, resolveFiles } from "./utils";

function createFromTemplate(source: any, templateFile: string, outputFile: string): string {
  logger.info("Creating file... %s", outputFile);

  const fmt = readFileSync(path.join(__dirname, PRETTIER_SETTINGS_FILE));
  const renderedFmt = { ...JSON.parse(fmt), parser: "babel" };

  const tpl = readFileSync(path.join(__dirname, templateFile));
  const renderedTpl = ejs.render(tpl, { answers: source });

  if (fs.existsSync(outputFile)) {
    logger.trace("Deleting existing file %s", outputFile);
    fs.unlinkSync(outputFile);
  }

  logger.trace("Writing to file %s", outputFile);
  fs.outputFileSync(outputFile, prettier.format(renderedTpl, renderedFmt));

  logger.trace("Finished!");
  return outputFile;
}

export function generateSamples(): void {
  try {
    logger.debug("Started samples helper");

    const source = path.join(__dirname, RESOURCES_DIR, SAMPLES_DIR);
    const target = path.join(process.cwd(), SAMPLES_DIR);

    fs.copySync(source, target, { recursive: true });
    console.log(SAMPLES_HELPER_SUCCESS_MESSAGE.trim());

    process.exit(0);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

export async function createLocalConfig(): Promise<any> {
  try {
    logger.debug("Started config helper");
    console.log(CONFIG_HELPER_INTRO.trim());

    const answers = await inquirer.prompt(CONFIG_INQUIRY);
    const outputFile = path.join(process.cwd(), CONFIG_LOCAL_OUT_FILE);
    const config = buildConfig(answers);

    createFromTemplate(config, CONFIG_LOCAL_TPL_FILE, outputFile);

    console.log(CONFIG_HELPER_SUCCESS_MESSAGE.trim());

    process.exit(0);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

export function createWdioConfig(sourceFile: string, overrides: any): string {
  try {
    logger.info("Creating wdio config from %s...", sourceFile);

    const configFile = path.join(process.cwd(), sourceFile);
    const configDir = path.dirname(configFile);
    const outputFile = path.join(configDir, CONFIG_WDIO_OUT_FILE);
    const config = buildConfig(require(configFile).config, overrides);

    // final manipulation for webdriverio config properties
    const parsed = {
      ...config,
      directory: configDir,
      comparableOptions: resolveComparableOutDirs(configDir, config.comparableOptions),
      pages: resolveFiles(configDir, config.pages, false),
      specs: resolveFiles(configDir, config.specs),
      steps: [...resolveFiles(__dirname, [CORE_STEP_DEFS_GLOB]), ...resolveFiles(configDir, config.steps, false)],
      reportOutDir: path.join(configDir, config.reportOutDir)
    };

    const wdioFile = createFromTemplate(parsed, CONFIG_WDIO_TPL_FILE, outputFile);

    logger.trace("Raw config:\n%s", inspect(config));
    logger.trace("Parsed config:\n%s", inspect(parsed));

    return wdioFile;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}
