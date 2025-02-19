const express = require('express');
const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// Configurações do RabbitMQ
const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'import_response_queue';

async function publishToRabbitMQ(message) {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME);
  await channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));
  await channel.close();
  await connection.close();
}

app.post('/import', async (req, res) => {
  const { correlationId, filialId, csvFile } = req.body;

  try {
    // Simula processamento dos dados
    const errors = []; // Simulação de validação
    const status = 'completed'; // Sucesso ou erro geral

    console.log('processando')
    res.json({ message: 'Processamento iniciado' });

    setTimeout(async () => {
      console.log('finalizado')
      // Publica a resposta no RabbitMQ
      await publishToRabbitMQ({ correlationId, status, errors });
    }, 5000);
   

  } catch (error) {
    console.error('Erro ao processar importação:', error);
    res.status(500).json({ error: 'Erro ao processar importação' });
  }
});

app.listen(4000, () => console.log('Microserviço rodando na porta 4000'));
