import express from 'express'
import amqp from 'amqplib/callback_api.js';

const app = express()
const port = 3001

app.get('/oi', (req, res) => {
    console.log(process.env.FILA)
    res.status(200).send(process.env.FILA)
})

app.listen(port, () => {
    console.log(`POC RabbitMq Server - Port: ${port}`)
})

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'rpc_queue'+process.env.FILA;

    channel.assertQueue(queue, {
      durable: false
    });
    channel.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    channel.consume(queue, function reply(msg) {
      try {
      var n = parseInt(msg.content.toString());
      console.log(" [.] fib(%d)", n);

      var r = fibonacci(n);

      channel.sendToQueue(msg.properties.replyTo,
        Buffer.from(r.toString()), {
          correlationId: msg.properties.correlationId
        });

        const headers = msg.properties.headers || {};
        const deathCount = headers['x-death'] ? headers['x-death'][0].count : 0;
        console.log(headers, deathCount)

        process.exit(1)
        throw new Error('(=')
        channel.ack(msg);
        
    } catch (error) {
      // execute um sigterm
      console.log(error)
      channel.ack(msg);
    }});
  });
});

function fibonacci(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}