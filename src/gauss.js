import math from 'mathjs';

math.config({
    number: 'Fraction', // Default type of number:
                         // 'number' (default), 'BigNumber', or 'Fraction'
  })

function pivot(matrix, biggestElements, current){
    let p = current;
    let big = math.abs(math.divide(matrix[current][current], biggestElements[current]));
    for(let i = current + 1; i < matrix.length; i++){
        const dummy = math.abs(math.divide(matrix[i][current], biggestElements[i]));
        if(math.compare(dummy, big)>=1){
            big = dummy;
            p = i;
        }
    }
    if(p !== current){
        const dummy = matrix[p];
        matrix[p] = matrix[current];
        matrix[current] = dummy;
    }
}

function substitute(matrix){
    let answers = matrix.map(val=>0);
    const n = matrix.length-1;
    answers[n] = math.divide(matrix[n][n+1], matrix[n][n])
    for(let i = n; i >= 0; i--){
        let sum = 0;
        for(let j = i + 1; j <= n; j++){
            sum = math.add(sum, math.multiply(matrix[i][j], answers[j]))
        }
        answers[i] = math.divide(math.subtract(matrix[i][n+1], sum),matrix[i][i])
    }
    return answers;
}

function eliminate(matrix, biggestElements){
    for(let k = 0; k < matrix.length-1; k++){
        pivot(matrix, biggestElements, k);
        for(let i = k + 1; i < matrix.length; i++){
            let factor = math.divide(matrix[i][k], matrix[k][k]);
            for(let j = 0; j < matrix.length+1; j++){
                matrix[i][j] = math.subtract(matrix[i][j], math.multiply(factor, matrix[k][j]))
            }            
        }
    }
}

function gauss(matrix){
    let biggestElements = matrix.map(v=>0);
    for(let i = 0; i<matrix.length; i++){
        biggestElements[i] = math.abs(matrix[0][i]);
        for(let j = 1; j < matrix.length; j++){
            if(math.compare(math.abs(matrix[j][i]), biggestElements[i])>=1){
                biggestElements[i] = math.abs(matrix[j][i]);
            }
        }
    }
    eliminate(matrix, biggestElements);
    return substitute(matrix);
}

export default gauss;