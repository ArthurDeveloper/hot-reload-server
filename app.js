const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const defaultPath = require('./defaultPath');
const { parse } = require('node-html-parser');

function injectScript(req, res, next) {
	const script = `
	<script src="/socket.io/socket.io.js"></script>
	<script>
		const socket = io();
		socket.on('fileChanged', () => {
			location.reload();
		});
	</script>
	`;

	if (req.originalUrl.endsWith('.html')) { 
		const html = fs.readFileSync(path.join(defaultPath, req.originalUrl), { encoding: 'utf8' });
		const root = parse(html);

		const body = root.querySelector('body');
		body.innerHTML += script;

		return res.send(root.innerHTML);
	}

	next();
}

app.use('/', injectScript, express.static(defaultPath));

module.exports = app;