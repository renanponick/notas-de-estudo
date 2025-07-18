const axios = require('axios');
const fs = require('fs');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.techtrue.com.br/api/v1/services/face/list',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '
  }
};

axios(config)
.then((response) => {
  const jsonData = JSON.stringify(response.data, null, 2); // Formata JSON
  fs.writeFileSync('new.json', jsonData, 'utf8');
})
.catch((error) => {
  console.log(error);
});