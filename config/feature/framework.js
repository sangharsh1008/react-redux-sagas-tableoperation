const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const modes = {
  PASSTHROUGH: 'PASSTHROUGH',
  RECORD: 'RECORD',
  REPLAY: 'REPLAY',
};

const { INTERCEPTOR_MODE } = process.env;

const alwaysPass = (received, argument) => ({
  message: () => `Skipped snapshot comparison.`,
  pass: true,
});

const toMatchImageSnapshot =
  INTERCEPTOR_MODE !== modes.RECORD && process.env.SCREENSHOTS
    ? configureToMatchImageSnapshot({})
    : alwaysPass;

expect.extend({ toMatchImageSnapshot });

jest.setTimeout(global.__DEBUG__ ? 1e6 : 60e3);

/**
 * Assert the interceptor/pageHelper (listener) has used all RequestResponse
 * groups and that no errors occurred.
 * Example call: expect(pageHelper).toCompleteRequestResponse();
 */
expect.extend({
  toCompleteRequestResponse(errors) {
    const pass = this.equals(errors, []);
    if (pass) {
      return {
        message: () => `expected interceptor to have errors: ${this.utils.printReceived(errors)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected interceptor to have no errors: ${this.utils.printReceived(errors)}\n`,
        pass: false,
      };
    }
  },
});
