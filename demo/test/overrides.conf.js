const base = require("./wdio.conf").config;
const overrides = {
  onComplete: () => {
    base.onComplete();
    console.log("This is an override");
  }
};

exports.config = Object.assign({}, base, overrides);
