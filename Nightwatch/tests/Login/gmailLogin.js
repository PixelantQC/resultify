var report = require('../../scripts/report.js');

// Objects

// Login Fields
var gmail = '._google-sign-in';
var email = '#Email';
var password = '#Passwd';
var next = '#next';
var sign = '#signIn';
var allow = '#submit_approve_access';

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
      .waitForElementVisible('body', 1000);
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
      .click(gmail)
      .pause(500)
      .waitForElementVisible('body', 5000)
      .setValue(email, browser.globals.gmail)
      .click(next)
      .pause(500)
      .waitForElementVisible('body', 5000)
      .setValue(password, browser.globals.gmailPassword)
      .click(sign)
      .pause(500)
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .click(allow)
      .waitForElementVisible(userInfo, 5000, 'User info is visiblle?')
      .verify.containsText(
        profileInfo,
        'Anton',
        'Anton is logged in?'
      )
      .pause(5000);
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
