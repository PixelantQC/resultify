var report = require('../../scripts/report.js');

// Objects

// Login Fields
var username = '#username';
var password = '#password';

// Dashboard
var userInfo    = '.user-info';
var profileInfo = '.profile-info';

// Buttons
var submit = 'button[type=submit]';
var add    = '.menu-action button';
var costLink   = '.menu-action a[href*="cost"]';

// Cost page Form
var name = '#name';
var categoryMedia = '#category option[value=media]';
var typePercentOfMedia = '#costType option[value=percent_of_media]';
var cost = '#cost';
var startDate = 'div[data-cost=onetime] input.startdate';
var endDate = 'input.enddate';
var generalType = '.cost-type-switch option[data-sub=general]';

// Cost page List
var costTable = '#costs-table';
var searchField = 'input[type=search]';
var deleteButton = '#costs-table tbody tr:first-child td:last-child form';
var confirmDelete = '#modal-delete-cost #delete';
var costItem = '#costs-table a[href*="media-cost"]';
var toast = '.toast-message';
var modal = '#modal-delete-cost';

module.exports = {
  'Open Resultify QA Server': function(browser) {
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

  'Login with Username': function(browser) {
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

  'Navigate to Add a Cost page': function(browser) {
    browser
      .click(add)
      .pause(500)
      .click(costLink)
      .pause(500)
      .waitForElementVisible('body', 5000)
      .assert.title("Generate New cost");
  },

  'Fill in the form with One Time Cost data': function(browser) {
    browser
      .setValue(name, 'Media Cost')
      .click(categoryMedia)
      .pause(500)
      .click(typePercentOfMedia)
      .pause(500)
      .setValue(cost, '20')
      .setValue(startDate, '23/02/2016')
      .setValue(endDate, '10/03/2016')
      .click(generalType)
      .pause(500)
      .click(submit)
      .waitForElementVisible(costTable, 5000)
      .verify.elementPresent(toast, 'Alert message appears?')
      .verify.containsText(toast, 'New cost was created', 'Alert message is successful?');
  },

  'Check if Cost is in the Table': function(browser) {
    browser
      .setValue(searchField, 'Media Cost')
      .verify.elementPresent(costItem, 'Media Cost is present in the Table?');
  },

  'CleanUp new Cost': function(browser) {
    browser
      .click(deleteButton)
      .pause(500)
      .verify.visible(modal, 'Modal window is visible?')
      .click(confirmDelete)
      .waitForElementVisible(costTable, 5000)
      .setValue(searchField, 'Media Cost')
      .waitForElementVisible(costTable, 5000)
      .verify.elementPresent(toast, 'Alert message appears?')
      .verify.containsText(toast, 'Deleted a campaign cost', 'Alert message is successful?');
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
