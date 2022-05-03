const http = require('http');
const route = require('./routes')

const server = http.createServer(route.reqHandler)

server.listen(3300) 