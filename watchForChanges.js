const fs = require('fs');
const path = require('path');

function watchFiles(dirPath, extensions, callback) {
	const files = fs.readdirSync(dirPath);

	for (const file of files) {
		const fileName = path.join(dirPath, file);
		const stat = fs.lstatSync(fileName);

		if (stat.isDirectory()) {
			watchFiles(fileName, extensions, callback);
		} else {
			for (const extension of extensions) {
				if (fileName.indexOf(extension) !== -1) {
					fs.watchFile(fileName, callback);
					break;
				}
			}
		}
	}
}

module.exports = watchFiles;