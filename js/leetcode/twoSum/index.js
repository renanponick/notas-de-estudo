/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const seen = new Map(); // Map para armazenar números e seus índices

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }

        seen.set(nums[i], i);
    }
};

function teste() {
    const argsTest = [
        { question: [2, 7, 1, 15], response: [0, 1] },
        { question: [2, 7, 15, 1], response: [0, 1] },
        { question: [2, 1, 7, 15], response: [0, 2] },
        { question: [2, 1, 15, 7], response: [0, 3] },
        { question: [2, 15, 7, 1], response: [0, 2] },
        { question: [2, 15, 1, 7], response: [0, 3] },
        { question: [7, 2, 1, 15], response: [0, 1] },
        { question: [7, 2, 15, 1], response: [0, 1] },
        { question: [7, 1, 2, 15], response: [0, 2] },
        { question: [7, 1, 15, 2], response: [0, 3] },
        { question: [7, 15, 2, 1], response: [0, 2] },
        { question: [7, 15, 1, 2], response: [0, 3] },
        { question: [1, 2, 7, 15], response: [1, 2] },
        { question: [1, 2, 15, 7], response: [1, 3] },
        { question: [1, 7, 2, 15], response: [1, 2] },
        { question: [1, 7, 15, 2], response: [1, 3] },
        { question: [1, 15, 2, 7], response: [2, 3] },
        { question: [1, 15, 7, 2], response: [2, 3] },
        { question: [15, 2, 7, 1], response: [1, 2] },
        { question: [15, 2, 1, 7], response: [1, 3] },
        { question: [15, 7, 2, 1], response: [1, 2] },
        { question: [15, 7, 1, 2], response: [1, 3] },
        { question: [15, 1, 2, 7], response: [2, 3] },
        { question: [15, 1, 7, 2], response: [2, 3] }
    ]

    const argsTest2 = [
        { question: [3, 2, 4], response: [1, 2] },
        { question: [3, 4, 2], response: [1, 2] },
        { question: [2, 3, 4], response: [0, 2] },
        { question: [2, 4, 3], response: [0, 1] },
        { question: [4, 3, 2], response: [0, 2] },
        { question: [4, 2, 3], response: [0, 1] }
    ]

    var verifyValues = function(answares) {
        return answares.map(it => {
            if(it.teste.length <= 2){
                return it.teste.includes(it.response[0]) && it.teste.includes(it.response[1])
            }
            return false
        })    
    }

    const answares = argsTest.map(it => { return { teste: twoSum(it.question, 9), response: it.response } })
    console.log(answares)
    const verifiedResults = verifyValues(answares)
    console.log(verifiedResults)

    const answares2 = argsTest2.map(it => { return { teste: twoSum(it.question, 6), response: it.response } })
    console.log(answares2)
    const verifiedResults2 = verifyValues(answares2)
    console.log(verifiedResults2) 
}

teste()