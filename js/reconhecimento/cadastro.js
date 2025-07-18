const axios = require('axios');
let data = JSON.stringify({
  "Images": [
    {
        "imageType": "frontal",
        "imageData": "{{base64_image}}"
    }
  ]
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.techtrue.com.br/api/v1/services/face/enroll/123',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '
  },
  data: data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error.response);
});