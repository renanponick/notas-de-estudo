/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length) {
        return false
    }
    const validAnagram = new Map()

    for (let i = 0; i < s.length; i++) {
        if(validAnagram.has(s[i])){
            validAnagram.set(s[i], validAnagram.get(s[i])+1)
        } else {
            validAnagram.set(s[i], 1)
        }
    }
    for (let i = 0; i < t.length; i++) {
        if(!validAnagram.has(t[i])){
            return false
        }
        validAnagram.set(t[i], validAnagram.get(t[i])-1)
    }

    console.log(validAnagram)
    for (var value of validAnagram.values()) {
        if(value) {
            return false
        }
    }

    return true
};


const verify = function(result, gabarito) {
    if(result == gabarito){
        console.log('Passou ✅', 'Retornou:', result, 'Esperava:', gabarito);
    } else {
        console.log('Falhou ❌', 'Retornou:', result, 'Esperava:', gabarito);
    }
}

verify(isAnagram("rat", "cat"), false)
verify(isAnagram("rat", "tar"), true)
verify(isAnagram("anagram", "nagaram"), true)
verify(isAnagram("batata", "ratata"), false)
verify(isAnagram("batata", "abatat"), true)
verify(isAnagram("batata", "bat"), false)
verify(isAnagram("abb", "bba"), true)
verify(isAnagram("abb", "aab"), false)