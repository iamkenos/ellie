import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as util from "util";

import * as logger from "../../logger";

export function inspect(object: any): any {
  return util.inspect(object, false, null, true);
}

export function readFileSync(path: string): string {
  return fs.readFileSync(path, "utf8");
}

export function resolveFiles(baseDir: string, fileGlob: string[], isStrict = true): string[] {
  const resolved: string[] = [];

  fileGlob.forEach((i: string): void => {
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

  return resolved;
}
