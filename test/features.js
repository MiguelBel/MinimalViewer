module.exports = {
  'Lateral movement': function (browser) {
    App.enter(browser);
    App.expect_to_have_item(1, browser);

    App.move_right(browser);
    App.expect_to_have_item(2, browser);

    App.move_right(browser);
    App.expect_to_have_item(3, browser);

    App.move_left(browser);
    App.move_left(browser);
    App.expect_to_have_item(1, browser);

    App.enter(browser);
    App.expect_to_have_item(4, browser);
    App.enter(browser);
    App.expect_to_have_item(5, browser);

    browser.end();
  },

  'Do not show already shown': function (browser) {
    App.enter(browser);
    App.expect_to_have_item(1, browser)
    App.enter(browser);
    App.expect_to_have_item(2, browser)

    browser.end();
  },

  'Counter': function (browser) {
    var total = 30;

    App.enter(browser);
    App.expect_counter_to_have(1, total, browser);

    App.move_right(browser);
    App.expect_counter_to_have(2, total, browser);

    App.enter(browser);
    var total = 28;
    App.expect_counter_to_have(1, total, browser);
  }
};

App = {
  app_url: 'http://minimal_viewer:9300/test',

  enter: function(browser) {
    browser
      .url(this.app_url)
      .waitForElementVisible('#story-url', 1000)
  },

  move_right: function(browser) {
    browser.keys(browser.Keys['RIGHT_ARROW'])
  },

  move_left: function(browser) {
    browser.keys(browser.Keys['LEFT_ARROW'])
  },

  expect_to_have_item(number, browser) {
    browser.assert.containsText('#story-url', 'Title ' + number)
  },

  expect_counter_to_have(number, total, browser) {
    browser.assert.containsText('#stories-counter', number + '/' + total)
  }
}
