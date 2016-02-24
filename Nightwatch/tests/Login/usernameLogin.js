var report = require('../../scripts/report.js');

// Objects

// Login Fields
var username = '#username';
var password = '#password';

// Buttons
var submit = 'button[type=submit]';

// Dashboard
var userInfo = '.user-info';
var profileInfo = '.profile-info';

module.exports = {
  'Open Google': function(browser) {
    browser
      .maximizeWindow()
      .url(browser.globals.url)
      .waitForElementVisible('body', 5000);
  },

  'TEST INFO!': function(browser) {
    browser
      .verify.visible('body', 'Test source: ' + browser.globals.test_settings.selenium_host)
      .verify.visible('body',
        'Test platform is: ' + browser.options.desiredCapabilities.platform +
        '. Test browser is: ' + browser.options.desiredCapabilities.browserName +
        ' ' + browser.options.desiredCapabilities.version)
      .verify.visible('body', 'Job ID is: ' + browser.sessionId);
  },

  'Login with username': function(browser) {
    browser
      .setValue(username, browser.globals.login)
      .setValue(password, browser.globals.password)
      .click(submit)
      .waitForElementVisible(userInfo, 5000)
      .verify.containsText(
        profileInfo,
        'Anton (Resultify)',
        'Anton is logged in?'
      );
  },

  after: function(browser) {
    browser.end();
  },

  afterEach: function(browser, done) {
    if (browser.globals.test_settings.selenium_host === 'ondemand.saucelabs.com') {
      report.reportPassed(browser, done);
    } else {
      done();
    }
  },
};
