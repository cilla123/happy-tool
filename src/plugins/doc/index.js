const opn = require('opn');

module.exports = {
    name: "doc",
    description: "查看 HappyNode 框架文档",
    help: () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ happy doc');
        console.log();
    },
    action: () => {
        // opn('https://www.youzanyun.com/zan-node');
        process.exit(0);
    }
};