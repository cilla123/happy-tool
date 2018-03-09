const Checker = require('../../lib/checker');
const Util = require('../../lib/util');
const htmlmin = require('../../lib/htmlmin');

module.exports = function () {
    Checker.checkHappyConfig();
    let config = Util.getHtmlminConfig();
    htmlmin(config);
};