const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const download = require('download');
const ejs = require('ejs');
const ora = require('ora');
const Util = require('../../lib/util');
const NODE_MODULE_TEMPLATE = 'https://github.com/cilla123/happy-node-module-template/archive/master.zip';

module.exports = function (moduleName) {
    if (fs.existsSync(moduleName)) {
        console.log(chalk.red(`创建失败，目录 ${moduleName} 已存在`));
        return;
    }

    let promps = [{
        type: 'input',
        name: 'name',
        message: '请输入模块名称:',
        default: `${moduleName}`,
        validate: (input) => {
            if (!input) {
                return '模块名称不能为空';
            }
            return true;
        }
    }, {
        type: 'input',
        name: 'version',
        default: '0.0.1',
        message: '请输入模块版本号:'
    }, {
        type: 'input',
        name: 'description',
        message: '请输入模块描述信息:'
    }, {
        type: 'input',
        name: 'author',
        message: '请输入模块作者信息:'
    }, {
        type: 'list',
        name: 'license',
        message: '请选择License:',
        choices: [
            'MIT',
            'Apache License 2.0',
            'None'
        ]
    }];

    inquirer.prompt(promps).then((answers) => {
        let downloadPath = path.join(Util.getRootPath(), 'downloads/');

        // 显示 loading
        const spinner = ora({
            text: '正在下载项目模板...',
            color: 'green'
        }).start();

        download(NODE_MODULE_TEMPLATE, downloadPath, {
            extract: true
        }).then((data) => {
            // 关闭 loading
            spinner.stop();
            
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let newPath = path.join(Util.getProjectRoot(), item.path.replace(item.path.split('/')[0], moduleName));

                if (item.type === 'file') {
                    let fileData = fs.readFileSync(path.join(downloadPath, item.path), 'utf8');
                    let content = ejs.compile(fileData)(answers);
                    fs.outputFileSync(newPath, content);
                    console.log(chalk.green('新建文件：', newPath));
                } else if (item.type === 'directory') {
                    fs.ensureDirSync(newPath);
                    console.log(chalk.green('新建目录：', newPath));
                }
            }

            console.log(chalk.green('✔ 创建成功'));
            console.log(chalk.green(''));
            console.log(chalk.green(`进入项目目录：cd ${moduleName}`));
            console.log(chalk.green('安装依赖：npm install'));
            console.log(chalk.green('开发需要用到的命令:'));
            console.log(chalk.green(''));
            console.log(chalk.green('    编译模块源码：npm run build'));
            console.log(chalk.green('    编译模块源码（监听模式）：npm run build:watch'));
            console.log(chalk.green(''));
        });
    });
};
