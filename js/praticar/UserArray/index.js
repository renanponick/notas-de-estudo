const agrupar = function(args, withReduce) {
    if(withReduce){
        return args.reduce((totalUser, currentUser) => {
            if("userId" in currentUser){
                const userId = currentUser.userId || 'NA'
                totalUser[userId] = (totalUser[userId] || 0 ) + (currentUser.value || 0);
            }
            return totalUser
        }, {})
    }
    const result = new Map()

    args.forEach(element => {
        if("userId" in element){
            const userId = element.userId || 'NA'
            const currentTotal = result.get(userId) || 0
            result.set(userId, currentTotal + (element.value || 0))
        }
    });

    return Object.fromEntries(result)
}

const verify = function(result, gabarito) {
    if(JSON.stringify(result) === JSON.stringify(gabarito)){
        console.log('Passou ✅', 'Retornou:', result, 'Esperava:', gabarito);
    } else {
        console.log('Falhou ❌', 'Retornou:', result, 'Esperava:', gabarito);
    }
}

const values = [
    {
        input: [{userId: 1, value: 10}, {userId: 2, value: 5}, {userId: 1, value: 3}],
        output: { 1: 13, 2: 5 }
    },
    {
        input: [{userId: 1, value: undefined}, {userId: 2, value: 5}, {userId: 1, value: 3}],
        output: { 1: 3, 2: 5 }
    },
    {
        input: [{userId: undefined, value: 10}, {userId: 2, value: 5}, {userId: 1, value: 3}],
        output: { 1: 3, 2: 5, "NA": 10 }
    },
    {
        input: [{userId: 1, value: 10}, {userId: 2, value: 5}, {batata: 1, value: 3}],
        output: { 1: 10, 2: 5 }
    },
    {
        input: [{userId: 1, value: 10}, {userId: 2, value: 5}, { userId: 1, value: undefined}],
        output: { 1: 10, 2: 5 }
    }
]

values.map(teste => {
    verify(agrupar(teste.input), teste.output)
    verify(agrupar(teste.input, true), teste.output)
})