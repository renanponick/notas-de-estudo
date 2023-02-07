// npm install pm2 -g
// pm2 start server.js --node-args="--max-old-space-size=120"
// pm2 stop server

var { createServer } = require('http')
var Events = require('events')
var { randomBytes } = require('crypto')
const myEvents = new Events()

function getBytes() {
    return randomBytes(10000)
}

function onData() {
    getBytes()
}

function handler(req, res) {
    myEvents.on('data', onData)
    var batata = 'um texto qualquer'
    myEvents.emit('data', Date.now())

    res.end('ok')
}

createServer(handler)
    .listen(3000, () => console.log('server is running at 3000'))