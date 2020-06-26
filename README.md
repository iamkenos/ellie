<h1 align="center">ELLIE</h1>

<p align="center">
  <a href="./docs/SEEDED_STEPS.md">Steps</a> |
  <a href="./docs/DETAILED_GUIDE.md">Detailed Guide</a> |
  <a href="./docs/RELEASES.md">Releases</a>
</p>

---

## About

This is a thin wrapper around the popular [WebdriverIO](https://webdriver.io/) test automation framework.

Key features:

- write tests with [TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html) and [Cucumber](https://cucumber.io/docs/guides/overview/)
- provide a set of seeded steps that can be used out of the box
- run tests synchronously and provide a presentable feedback
- internal polling and retries when interacting with the browser and its elements

Check out the [steps](./docs/SEEDED_STEPS.md) readily available for you to use and know more by going through the [detailed guide](./docs/DETAILED_GUIDE.md).

## Requirements

- NodeJS _`12.18.0`_ or higher
- JDK

## Get Started

1. Get it

   `npm install @iamkenos/ellie`

2. Try it

   `ellie whistle`

3. Run it

   `ellie ./samples/ellie.conf.ts`

## Acknowledgements

Huge thanks to the [WebdriverIO team](https://github.com/webdriverio/webdriverio/blob/master/AUTHORS.md) for their awesome work!

## Contribute

Pull requests are welcome, you can find the backlog / roadmap [here](https://github.com/iamkenos/ellie/projects/1). Fork the repo and raise away!

## License

MIT
