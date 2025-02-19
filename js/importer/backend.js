const express = require('express');
const axios = require('axios');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const amqp = require('amqplib');
const cors = require('cors');

const app = express();
app.use(express.json());

const redisClient = require("./redisClient");

const startImport = async (req, res) => {
  const { filialId } = req.body;
  console.log('oi', filialId)

  // Verifica no Redis se já há um processo ativo
  const isImporting = await redisClient.get(`import:filial:${filialId}`);
  if (isImporting) {
    throw new Error('Importação já em andamento para esta filial.');
    //return res.status(400).json({ error: "Importação já em andamento para esta filial." });
  }

  // Define chave no Redis com TTL de 30 minutos
  await redisClient.set(`import:filial:${filialId}`, "in_progress", "EX", 1800);
};

// Após finalizar o processo, remove a chave no Redis
const onImportComplete = (filialId) => {
  redisClient.del(`import:filial:${filialId}`);
};


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

// Configurações do RabbitMQ
const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'import_response_queue';
const correlationMap = new Map();

// Configurações de WebSocket
const httpServer = require('http').createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',  // Permite conexões do frontend rodando no localhost:5173
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-socket-id'],
    credentials: true,  // Se necessário, para cookies ou cabeçalhos adicionais
  }
});
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
});

// Endpoint para iniciar a importação
app.post('/start-import', async (req, res) => {
  console.log('oie')
  const correlationId = uuidv4();
  const clientSocketId = req.headers['x-socket-id'];
  const payload = { ...req.body, correlationId };

  // Salva o correlationId e o WebSocket correspondente
  correlationMap.set(correlationId, clientSocketId);

  try {
    await startImport(req,res)
    // Faz a requisição ao microserviço
    console.log('iniciado', payload)
    await axios.post('http://localhost:4000/import', payload);
    res.json({ message: 'Importação iniciada', correlationId });
  } catch (error) {
    console.error('Erro ao enviar para o microserviço:', error.message);
    res.status(500).json({ error: error.message || 'Erro ao iniciar a importação' });
  }
});

// Consumir mensagens do RabbitMQ
async function consumeRabbitMQ() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME);

  channel.consume(QUEUE_NAME, (message) => {
    console.log('Mensagem recebida:', message.content.toString());
    if (message) {
      const { correlationId, status, errors } = JSON.parse(message.content.toString());

      // Encontra o WebSocket pelo correlationId
      const clientSocketId = correlationMap.get(correlationId);

      if (clientSocketId) {
        io.to(clientSocketId).emit('import-status', { status, errors });
        correlationMap.delete(correlationId);
        onImportComplete('SADASD')
      }

      channel.ack(message);
    }
  });
}

consumeRabbitMQ().catch(console.error);

httpServer.listen(3000, () => console.log('Monolito rodando na porta 3000'));