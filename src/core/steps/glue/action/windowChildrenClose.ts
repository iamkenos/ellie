import { driver } from "../../../browser";

export default (): void => {
  driver.closeChildWindows();
};
