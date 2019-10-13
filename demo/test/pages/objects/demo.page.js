import { Page } from 'ellie';
import demo from '../meta/demo.meta';

export default class DemoPage extends Page {
  constructor() {
    super(demo);
  }

  getSectionHeader(label) {
    return this.getElement(this.locators.sectionHeader.replace('##LABEL##', label));
  }
}
