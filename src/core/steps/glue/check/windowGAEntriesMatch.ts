import { driver } from "../../../browser";

/**
 * @see {@link https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters|GA > Dev Guides > Parameters}
 */
export default (event: string, preferred: string, filename: string): void => {
  driver.checkGAEntriesMatchRef(filename, event, !preferred);
};
