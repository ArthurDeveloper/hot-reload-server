const watchFiles = require('./watchForChanges');
const { server, httpServer } = require('./socket');
const defaultPath = require('./defaultPath');

watchFiles(defaultPath, ['.html', '.css', '.js'], (curr, prev) => {
	server.sockets.emit('fileChanged');
});


httpServer.listen(3000, () => {
	console.log('Server started at http://localhost:3000');
	console.log('Watching files at '+defaultPath);
});