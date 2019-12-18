import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as util from "util";

import * as logger from "../../logger";

import { IConfig } from "../interfaces";
import { DEFAULT } from "../config";

export function buildConfig(...config: any): IConfig {
  // create a config object from all the user supplied info
  const userConfig: IConfig = config
    .filter((i: object) => Object.entries(i).length !== 0 && i.constructor === Object)
    .reduce((i: object, j: object): object => ({ ...i, ...j }), {});

  // merge defaults and user supplied info for defaults to serve as fallback
  const mergedConfig: IConfig = { ...DEFAULT, ...userConfig };
  // for array type properties
  mergedConfig.pages = typeof mergedConfig.pages === "string" ? [mergedConfig.pages] : mergedConfig.pages;
  mergedConfig.specs = typeof mergedConfig.specs === "string" ? [mergedConfig.specs] : mergedConfig.specs;
  mergedConfig.steps = typeof mergedConfig.steps === "string" ? [mergedConfig.steps] : mergedConfig.steps;
  // fallback for capabilities
  mergedConfig.capabilities = userConfig.capabilities || DEFAULT.capabilities[mergedConfig.runnerService];
  // fallback for comparable options
  mergedConfig.comparableOptions = { ...DEFAULT.comparableOptions, ...userConfig.comparableOptions };

  return mergedConfig;
}

export function inspect(object: any): any {
  return util.inspect(object, false, null, true);
}

export function readFileSync(path: string): string {
  return fs.readFileSync(path, "utf8");
}

export function resolveComparableOutDirs(directory: string, comparableOptions: IConfig["comparableOptions"]): any {
  const options = Object.entries(comparableOptions)
    .reduce((i, j): object => (
      {
        ...i,
        [j[0]]: {
          ...j[1],
          outputDir: path.join(directory, (j[1] as any).outputDir),
          baselineDir: path.join(directory, (j[1] as any).outputDir, "baseline"),
          actualDir: path.join(directory, (j[1] as any).outputDir, "actual"),
          diffDir: path.join(directory, (j[1] as any).outputDir, "diff")
        }
      }
    ), {});

  return options;
}

export function resolveFiles(baseDir: string, fileGlob: string[], isStrict = true): string[] {
  const resolved: string[] = [];

  fileGlob.filter(Boolean).forEach((i: string): void => {
    const filePath: string = path.resolve(baseDir, i);
    const files: string[] = glob.sync(filePath);

    if (files.length === 0) {
      logger.warn("No matches found for glob %s", filePath);
    } else {
      files.forEach((i): number => resolved.push(path.resolve(i)));
    }
  });

  if (resolved.length === 0 && isStrict) {
    throw new Error("Unable to resolve any existing file from the given paths. See warnings.");
  }

  // reduce to a unique set
  return [...new Set(resolved)];
}
