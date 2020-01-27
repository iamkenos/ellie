import { BasePage } from '../../../../build';
import demo from '../meta/demo.meta';

export default class DemoPage extends BasePage {
  constructor() {
    super(demo);
  }

  getSectionHeader(label) {
    return this.getElement(this.locators.sectionHeader.replace('##LABEL##', label));
  }
}
