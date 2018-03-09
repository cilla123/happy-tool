const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const shelljs = require('shelljs');
const Util = require('./util');
const PrintHelper = require('./print_helper');

module.exports = {

    // 检测当前目录是否存在项目配置文件 happy.json
    checkHappyConfig() {
        let projectRoot = Util.getProjectRoot();
        if (!fs.existsSync(path.join(projectRoot, 'happy.json'))) {
            console.log(chalk.red('当前目录不存在 happy.json 配置文件！'));
            PrintHelper.printConfigHelp();
            shelljs.exit(1);
        }
    },

};
