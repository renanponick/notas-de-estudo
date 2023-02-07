import express from 'express'
import amqp from 'amqplib/callback_api.js';
import { v4 as uuid } from 'uuid'

const app = express()
const port = 3002

app.get('/oi', (req, res) => {
    res.status(200).send('To vivo')
})

app.get('/rabbit/:number', async (req, res) => {
    const num = req.params.number;
    console.log(num);

    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
            throw error1;
            }
            channel.assertQueue('', {
            exclusive: true
            }, function(error2, q) {
            if (error2) {
                throw error2;
            }
            var correlationId = uuid();

            console.log(' [x] Requesting fib(%d)', num);

            channel.consume(q.queue, function(msg) {
                if (msg.properties.correlationId == correlationId) {
                console.log(' [.] Got %s', msg.content.toString());
                }
            }, {
                noAck: true
            });

            channel.sendToQueue('rpc_queue',
                Buffer.from(num.toString()),{
                correlationId: correlationId,
                replyTo: q.queue });
            });
        });
    });
    res.status(200).send()
})

app.listen(port, () => {
    console.log(`POC RabbitMq Client - Port: ${port}`)
})