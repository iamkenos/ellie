import { driver } from "../../../browser";

export default (event: string, preferred: string, filename: string): void => {
  driver.checkGAEntriesMatchRef(filename, event, !preferred);
};
