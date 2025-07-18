function consultar(codigo) {
    const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados?formato=json&dataInicial=01/01/2024&dataFinal=09/02/2024`
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


consultar(433) // 433 é o código do IPCA
consultar(12) // 12 é o juros CDI
consultar(11) // 11 é a selic