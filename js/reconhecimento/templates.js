const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.techtrue.com.br/api/v1/services/face/templates/count/<id>',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});