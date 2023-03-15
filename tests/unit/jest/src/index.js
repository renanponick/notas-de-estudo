const express = require('express')

const app = express()

app.get('/health-check', (_, res) => {
    return res.status(200).send('Funcionando\n')
})

const server = app.listen(3000);

console.log('Listening on localhost:3000')

module.exports = server