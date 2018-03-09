const action = require('./action');

module.exports = {
	name: "init <projectName>",
	description: "初始化一个新的 HappyNode Web 项目",
	action: action,
	help: () => {
		console.log('  Examples:');
        console.log('');
        console.log('    $ happy init intro');
        console.log();
	}
};
