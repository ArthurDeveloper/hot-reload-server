const app = require('./app');

const { Server } = require('socket.io');
const http = require('http');

const httpServer = http.createServer(app);
const server = new Server(httpServer);

module.exports = { server, httpServer };