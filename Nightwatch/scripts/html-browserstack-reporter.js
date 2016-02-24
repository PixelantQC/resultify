var path = require('path');
var HtmlReporter = require('nightwatch-html-reporter');
var date = new Date().getTime();
var timestamp = String(date) + '.html';

/* Same options as when using the built in nightwatch reporter option */
var reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: path.resolve(__dirname, '../browserstack_reports'),
  reportFilename: timestamp,
});

module.exports = {
  write: function(results, options, done) {
    reporter.fn(results, done);
  },
};
