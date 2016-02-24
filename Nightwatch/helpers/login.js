var secret = require('./.secret.js');

module.exports = {
  login: function(browser) {
    browser
      .url('http://duni.typo3konsult.se/')
      .maximizeWindow()
      .waitForElementVisible('body', 1000)
      .setValue('input[name="tx_pxaduniqbank_duniqbanklogin[user]"]', secret.login)
      .setValue('input[name="tx_pxaduniqbank_duniqbanklogin[password]"]', secret.password)
      .click('input[type=submit]')
      .pause(1000)
      .verify.title('Design')
      .waitForElementVisible('body', 1000);
  },
};
