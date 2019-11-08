const chalk = require('chalk');
const { PuppeteerTeardown } = require('@cainc/ca-puppeteer');

module.exports = async function() {
  if (process.env.SERVE) {
    console.log(chalk.green('Teardown Server.'));
    let callback;
    const close = new Promise(resolve => (callback = resolve));
    global.__SERVER__.close(callback);
    await close;
  }

  await PuppeteerTeardown();
};
