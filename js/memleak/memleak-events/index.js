// By Youtube - Erick Wendel
import { createServer } from 'http'
import Events from 'events'
import { randomBytes } from 'crypto'
const myEvents = new Events()

function getBytes() {
    return randomBytes(10000)
}

function onData() {
    const items = []
    setInterval(function myInterval() { items.push(msg) }, 200)
    getBytes()
}

myEvents.on('data', onData)
function handler(req, res) {

    myEvents.emit('data', Date.now())

    res.end('ok')
}

createServer(handler)
    .listen(3000, () => console.log('server is running at 3000'))

// To start
// node --experimental-modules index.js