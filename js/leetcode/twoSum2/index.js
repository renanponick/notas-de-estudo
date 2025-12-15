/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSumV2 = function(numbers, target) {
    let left = 0
    let right = numbers.length - 1
    while (left < right) {
        const result = numbers[left] + numbers[right]
        if(result === target) {
            return [left+1, right+1]
        } else if (result < target) {
            left++
        } else {
            right--
        }
    }
};

const verify = function(result, gabarito) {
    if(result[0] === gabarito[0] && result[1] === gabarito[1]){
        console.log('Passou ✅', result);
    } else {
        console.log('Falhou ❌', result, 'esperado:', gabarito);
    }
}

verify(twoSumV2([2,7,11,15], 9), [1,2])
verify(twoSumV2([2,7,11,15], 13), [1,3])
verify(twoSumV2([2,7,11,15], 18), [2,3])
verify(twoSumV2([2,7,11,15], 26), [3,4])
verify(twoSumV2([2,3,4], 6), [1,3])