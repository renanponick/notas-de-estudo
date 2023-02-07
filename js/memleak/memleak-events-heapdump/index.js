// node --experimental-modules index.js
var { createServer } = require('http');
var Events = require('events');
var { randomBytes } = require('crypto');
const myEvents = new Events();

function createHeapSnapshot() {
    const v8 = require('v8');
    const fs = require('fs');
    const snapshotStream = v8.getHeapSnapshot();
    // It's important that the filename end with `.heapsnapshot`,
    // otherwise Chrome DevTools won't open it.
    const fileName = `v8fs-${Date.now()}.heapsnapshot`;
    const fileStream = fs.createWriteStream(fileName);
    snapshotStream.pipe(fileStream);
}

function createHeapDump() {
    var heapdump = require('heapdump');
    heapdump.writeSnapshot('/var/local/heapdump' + Date.now() + '.heapsnapshot');
    heapdump.writeSnapshot(function(err, filename) {
        console.log('dump written to', filename);
    });
}

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
    createHeapSnapshot()
    createHeapDump()
    res.end('ok')
}

createServer(handler)
    .listen(3000, () => console.log('server is running at 3000'))