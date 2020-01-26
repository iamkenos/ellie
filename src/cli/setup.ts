import * as ejs from "ejs";
import * as prettier from "prettier";
import * as fs from "fs-extra";
import * as inquirer from "inquirer";
import * as path from "path";

import logger from "../logger";
import { LEVELS } from "../logger/config";
import {
  CONFIG_HELPER_INTRO,
  CONFIG_HELPER_SUCCESS_MESSAGE,
  CONFIG_INQUIRY,
  CONFIG_LOCAL_OUT_FILE,
  CONFIG_LOCAL_TPL_FILE,
  CONFIG_WDIO_OUT_FILE,
  CONFIG_WDIO_TPL_FILE,
  CORE_STEP_DEFS_GLOB,
  DEFAULT,
  PRETTIER_SETTINGS_FILE,
  RESOURCES_DIR,
  SAMPLES_DIR,
  SAMPLES_HELPER_SUCCESS_MESSAGE
} from "./config";
import { inspect, readFileSync, resolveComparableOutDirs, resolveFiles } from "./utils";

function createFromTemplate(source: any, templateFile: string, outputFile: string): string {
  logger.debug("createFromTemplate() %s", outputFile);

  const fmt = readFileSync(path.join(__dirname, PRETTIER_SETTINGS_FILE));
  const renderedFmt = { ...JSON.parse(fmt), parser: "babel" };

  const tpl = readFileSync(path.join(__dirname, templateFile));
  const renderedTpl = ejs.render(tpl, { answers: source });

  if (fs.existsSync(outputFile)) {
    logger.debug("Deleting existing file %s", outputFile);
    fs.unlinkSync(outputFile);
  }

  logger.debug("Writing to file %s", outputFile);
  fs.outputFileSync(outputFile, prettier.format(renderedTpl, renderedFmt));

  logger.debug("Finished!");
  return outputFile;
}

export function generateSamples(): void {
  try {
    logger.debug("generateSamples()");

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
    logger.debug("createLocalConfig()");
    console.log(CONFIG_HELPER_INTRO.trim());

    const answers = await inquirer.prompt(CONFIG_INQUIRY).then(answers => {
      if (answers.browserstackEnabled === false) { delete DEFAULT.user; delete DEFAULT.key; }
      answers.pages = answers.pages.split(",");
      answers.specs = answers.specs.split(",");
      answers.steps = answers.steps.split(",");
      return answers;
    });
    const outputFile = path.join(process.cwd(), CONFIG_LOCAL_OUT_FILE);
    const config = { ...DEFAULT, ...answers };

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
    logger.debug("createWdioConfig() %s", sourceFile);

    const configFile = path.join(process.cwd(), sourceFile);
    const configDir = path.dirname(configFile);
    const outputFile = path.join(configDir, CONFIG_WDIO_OUT_FILE);
    const config = { ...DEFAULT, ...require(configFile).config, ...overrides };

    // soft check for logLevel to prevent wdio from dying
    if (!LEVELS.includes(config.logLevel)) {
      logger.warn("Logging level %s isn't supported. Use any one of %s", config.logLevel, LEVELS);
      logger.info("Falling back to logging level [%s]...", DEFAULT.logLevel);
      config.logLevel = DEFAULT.logLevel;
    }

    // final manipulation for webdriverio config properties
    const parsed = {
      ...config,
      directory: configDir,
      comparable: resolveComparableOutDirs(configDir, { ...DEFAULT.comparable, ...config.comparable }),
      pages: resolveFiles(configDir, config.pages, false),
      specs: resolveFiles(configDir, config.specs),
      steps: [...resolveFiles(__dirname, [CORE_STEP_DEFS_GLOB]), ...resolveFiles(configDir, config.steps, false)],
      reportOutDir: path.join(configDir, config.reportOutDir)
    };

    const wdioFile = createFromTemplate(parsed, CONFIG_WDIO_TPL_FILE, outputFile);

    logger.debug("Raw config:\n%s", inspect(config));
    logger.debug("Parsed config:\n%s", inspect(parsed));

    return wdioFile;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}
