const fs = require('fs');
const glob = require('glob');

const distPath = './dist/libs/ng-cron';

glob('/**/*.d.ts', {
	cwd: __dirname,
	root: distPath
}, (_er, files) => {
	files.forEach(f => {
		const content = fs.readFileSync(f).toString();
		const cleared = content
			.toString()
			.replace(/import\(.*dist\/libs\/cron-core"\)/gm, 'import(\'@sbzen/cron-core\')');

		fs.writeFileSync(f, cleared);
	});
});