<h1 align="center">ELLIE</h1>

<p align="center">
  <a href="./docs/SEEDED_STEPS.md">Steps</a> |
  <a href="./docs/DETAILED_GUIDE.md">Detailed Guide</a> |
  <a href="./docs/RELEASES.md">Releases</a>
</p>

---

## About

An abstraction of the popular [WebdriverIO](https://webdriver.io/) test automation framework.

Key features:

- write tests with [TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html) and [Cucumber](https://cucumber.io/docs/guides/overview/)
- cucumber steps that can be used out of the box
- run tests synchronously and present results in [Allure](https://webdriver.io/docs/allure-reporter.html)
- internal polling and retries when interacting with the browser and its elements

Check out the [steps](./docs/SEEDED_STEPS.md) readily available for you to use and know more by going through the [detailed guide](./docs/DETAILED_GUIDE.md).

## Requirements

- NodeJS _`12.18.3`_ or higher
- JDK

## Get Started

1. Get it

   `npm install @iamkenos/ellie`

2. Try it

   `npx ellie whistle`

3. Run it

   `npx ellie ./samples/ellie.conf.ts`

## Acknowledgements

Huge thanks to the [WebdriverIO team](https://github.com/webdriverio/webdriverio/blob/master/AUTHORS.md) for their awesome work!

## Contribute

Pull requests are welcome, you can find the backlog / roadmap [here](https://github.com/iamkenos/ellie/projects/1). Fork the repo and raise away!

## License

MIT
