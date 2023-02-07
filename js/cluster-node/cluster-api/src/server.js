import http from 'http'
const processId = process.pid

const server = http.createServer((req, res) => {
    for (let index = 0; index < 1e7; index++);
    res.end(`handle by pid: ${processId}`)
})

server.listen(3000)
    .once('listening', () => {
        console.log('Server started in process', processId)
    })

process.on('SIGTERM', () => {
    console.log('server ending', new Date().toISOString())
    server.close(()=> process.exit())
})

setTimeout(() => {
    process.exit(1)
}, Math.random() * 1e4)