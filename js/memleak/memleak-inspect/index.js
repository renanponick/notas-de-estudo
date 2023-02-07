const express = require('express')
const app = express()
const port = 3001
const requestLogs = [];

app.get('/', (req, res) => {
  requestLogs.push({ url: req.url, date: new Date() });
  res.status(200).send(JSON.stringify(requestLogs));
})

app.listen(port, () => {
  console.log(`Sample app listening on port ${port}.`)
})