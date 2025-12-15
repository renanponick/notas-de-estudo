//| 1. Remover duplicados de um array mantendo a ordem

const removeDuplicates = function (args) {
    const seen = new Set(args)

    return Array.from(seen)
}

const verify = function (result, template) {
    if (result.length != template.length){
        console.log('Falhou ❌', 'Retornou:', result, 'Esperava:', template);
        return
    }

    const teste = result.map((it, index) => {
        if(it !== template[index]) 
            return false
    }).filter(it => it === false)

    if(teste.length == 0){
        return console.log('Passou ✅', 'Retornou:', result, 'Esperava:', template);
    }
    return console.log('Falhou ❌', 'Retornou:', result, 'Esperava:', template);
}

verify(removeDuplicates([1, 2, 2, 3, 4, 3]), [1, 2, 3, 4])