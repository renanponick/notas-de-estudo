module.exports = {
  apps: [
    {
      name: 'Client1',
      script: 'client/src/index.js',
      instances: '1',
      exec_mode: 'cluster',
      env: {
        FILA: 'fila1',
        PORT: 3001
      }
    },
    {
      name: 'Client2',
      script: 'client/src/index.js',
      instances: '1',
      exec_mode: 'cluster',
      env: {
        FILA: 'fila2',
        PORT: 3001
      }
    },
    {
      name: 'Server1',
      script: 'server/src/index.js',
      instances: '1',
      exec_mode: 'cluster',
      env: {
        FILA: 'fila1',
        PORT: 3002
      }
    },
    {
      name: 'Server2',
      script: 'server/src/index.js',
      instances: '1',
      exec_mode: 'cluster',
      env: {
        FILA: 'fila2',
        PORT: 3002
      }
    }
  ]
};
