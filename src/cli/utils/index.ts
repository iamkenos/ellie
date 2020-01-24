import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as util from "util";

import * as logger from "../../logger";

import { IConfig } from "../interfaces";

export function inspect(object: any): any {
  return util.inspect(object, false, null, true);
}

export function readFileSync(path: string): string {
  return fs.readFileSync(path, "utf8");
}

export function resolveComparableOutDirs(directory: string, comparable: IConfig["comparable"]): any {
  const options = Object.entries(comparable)
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
