const Redis = require("ioredis");

// Configuração do cliente Redis
const redisClient = new Redis({
  host: "localhost", // ou o endereço do seu servidor Redis
  port: 6379,        // porta padrão do Redis
  password: "",      // se necessário, insira a senha do Redis
  db: 0              // índice do banco de dados Redis (default é 0)
});

module.exports = redisClient;
