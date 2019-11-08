const chalk = require('chalk');
const serve = require('../serve');
const { PuppeteerSetup } = require('@cainc/ca-puppeteer');

const argv = process.execArgv.join();

global.__DEBUG__ = argv.includes('inspect') || argv.includes('debug');

module.exports = async () => {
  console.log(
    chalk.yellow(
      'Debug mode:',
      global.__DEBUG__,
      'SERVE:',
      process.env.SERVE,
      'SCREENSHOTS:',
      process.env.SCREENSHOTS,
    ),
  );

  if (process.env.SERVE) {
    console.log(chalk.green('Setup Server, serving dist on port 3000 (same as dev server).'));
    let callback;
    const next = new Promise(resolve => (callback = resolve));
    global.__SERVER__ = serve(callback);
    await next;
  }

  await PuppeteerSetup();
};
