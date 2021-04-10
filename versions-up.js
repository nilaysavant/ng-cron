const fs = require('fs');
const path = require('path');

const packageFilePath = path.resolve(__dirname, `dist/libs/${process.env.LIB}/package.json`)
const content = fs.readFileSync(packageFilePath);
const json = JSON.parse(content);
const nextPackage = JSON.stringify({
	...json,
	version: `${json.version}-beta.${Date.now()}`
});

fs.writeFileSync(packageFilePath, nextPackage);