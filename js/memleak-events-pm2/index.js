// By Youtube - Erick Wendel
// node --experimental-modules index.js
// node --max-old-space-size=64 index.js
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