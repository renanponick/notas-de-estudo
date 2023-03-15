// addition - sum
// subtraction - sub
// division - div
// multiplication - mult
// square root - sqrt
// raised to the power - pow(base, expo)

function sum(num1, num2){
    if(isNaN(num1) || isNaN(num2)){
        throw 'Um ou mais parâmetros são letras';
    }
    
    return num1 + num2
}

function sub(num1, num2){
    if(isNaN(num1) || isNaN(num2)){
        throw 'Um ou mais parâmetros são letras';
    }

    return num1 - num2
}

function mul(num1, num2){
    if(isNaN(num1) || isNaN(num2)){
        throw 'Um ou mais parâmetros são letras';
    }
    if(num1 == 0 || num2 ==0) {
        return 0
    }

    return num1 * num2
}

function div(num1, num2){
    if(isNaN(num1) || isNaN(num2)){
        throw 'Um ou mais parâmetros são letras';
    }
    if(num2 == 0){
        throw 'Infinity';
    }

    return num1 / num2
}

function sqrt(num){
    if(isNaN(num)){
        throw 'Um ou mais parâmetros são letras';
    }
    if(num < 0){
        throw 'Impossível';
    }

    return Math.sqrt(num)
}

function pow(base, expo){
    if(isNaN(base) || isNaN(expo)){
        throw 'Um ou mais parâmetros são letras';
    }
    if(base == 0){
        return 0;
    }
    if(expo == 0){
        return 1;
    }

    return Math.pow(base, expo)
}

module.exports = {
    sum,
    sub,
    div,
    mul,
    sqrt,
    pow
}