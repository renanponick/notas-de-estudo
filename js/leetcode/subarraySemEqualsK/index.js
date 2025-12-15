/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    // [1,2,3] - k = 3
    // combinações a se fazer e verificar
    // [1], [1,2], [1,2,3], 
    // [2], [2,3], 
    // [3]
    let total = 0
    for (let i = 0; i < nums.length; i++) {       
        for(let j = i; j < nums.length; j++){
            let subarray = nums.slice(i, j + 1)
            if(subarray.reduce((ac, val) => ac + val, 0) === k){
                total++
            }
        }
    }
    return total
    
};

const verify = function(result, gabarito) {
    if(result == gabarito){
        console.log('Passou ✅', 'Retornou:', result, 'Esperava:', gabarito);
    } else {
        console.log('Falhou ❌', 'Retornou:', result, 'Esperava:', gabarito);
    }
}

verify(subarraySum([1,1,1], 2), 2)
// verify(subarraySum([1,2,3], 3), 2)
// verify(subarraySum([1,1,5], 2), 1)
// verify(subarraySum([1,1,5], 5), 1)
// verify(subarraySum([1,1,5], 6), 1)
// verify(subarraySum([1,1,5], 7), 1)
// verify(subarraySum([1,1,5], 8), 0)
// verify(subarraySum([2,1,5], 3), 1)