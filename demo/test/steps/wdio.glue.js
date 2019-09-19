import { Then, When } from 'cucumber';
import { WebElement, WebElements } from '../../../build/core/elements';
import { getElementSelector } from '../../../build/core/utils';
import assert from 'assert';

When(/^I pause for ([^"]*)?ms$/, ms => {
  browser.pause(ms);
});

When(/^I click the "([^"]*)?" link$/, linktext => {
  const link = new WebElement(`//a[text()='${linktext}']`);
  link.click(linktext);
});

When(/^I have a very long text:$/, text => {
  console.log(text);
});

When(/^I click the "([^"]*)?" button$/, text => {
  console.log('=========================', getElementSelector('demo-2_temp=>sameWindowLinks'));
  const btn = new WebElement(`//button[contains(text(),'${text}')]`);
  const elem = new WebElement('#makeInvisible');
  const elem2 = new WebElement('//span[./a[@id="linkSameWindow"]]');
  const elemes = new WebElements('//span[./a[@id="linkSameWindow"]]/a');
  const elem2Child = elem2.child$('/a');
  const elem2Children = elem2.child$$('/a');
  const elem2ChildrenInvalid = elem2.child$$('/as');
  btn.click(text);
  elem2Child.checkAttributeEquals('href', 'http://example.com/');
  elem2Child.isCountEquals(1);
  console.log(elemes.toArray());
  // elemes.checkTextEqualsArray(['a', 'b']);
  elemes.getElementMatchingText('a');
  // this should be a type error; broken test in allure
  elem2Children.checkAttributeEquals('href', 'http://example.com/');
});
