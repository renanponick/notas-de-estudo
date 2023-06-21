import requests
import json
import base64

# URL do endpoint
url = 'http://localhost:3001/oi'
contador = 0

while True:
    contador += 1

    response = requests.get(url)

    print(response.text)


# Informações de autenticação
# username = 'exemplo@email.com'
# password = '123456'

# credentials = f"{username}:{password}"
# encoded_credentials = base64.b64encode(credentials.encode('utf-8')).decode('utf-8')

# # Gerar o cabeçalho Basic Auth
# auth_header = f"Basic {encoded_credentials}"

# # Cabeçalho de autenticação
# headers = {
#   'Content-Type': 'application/json',
#   'Authorization': auth_header
# }

# Enviar a requisição POST com a autenticação básica
# response = requests.post(url2, data=payload, headers=headers)