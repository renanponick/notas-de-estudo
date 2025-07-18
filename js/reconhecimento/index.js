const axios = require('axios');
let data = JSON.stringify({
  "key": "",
  "secret": ""
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.techtrue.com.br/api/v1/app-credentials/token',
  headers: {
    'Content-Type': 'application/json'
  },
  data: data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});