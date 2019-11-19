const range = function (start, end) {
    let arr = [start];
    if (start === end) {
        return [end];
    }
    else {
        return arr.concat(range(start+1,end))
    }
}
// console.log(range(2,6)) // => [2,3,4,5,6]

const sumRec = function (arr) {
    let sum = 0
    if (arr.length === 0){
        return 0;
    }
    else {
        sum = sum + arr.shift() + sumRec(arr)
    }
    return sum;
}
// console.log(sumRec([-2,5,7])) // => 10

const exponent1 = function (base, exp) {
    if (exp === 0) {
        return 1;
    }
    else {
        return base * exponent1(base, exp-1)
    }
}
// console.log(exponent1(999,0)) // => 1
// console.log(exponent1(3,4)) // => 81
// console.log(exponent1(-2,5)) // => -32

const exponent2 = function (base, exp) {
    if (exp === 0) {
        return 1;
    }
    else if (exp === 1) {
        return base;
    }
    else if (exp % 2 === 0) {
        return exponent2(base, exp / 2) ** 2
    }
    else {
        return base * (exponent2(base, (exp - 1) / 2) ** 2)
    }
}
// console.log(exponent2(999,0)) // => 1
// console.log(exponent2(3,4)) // => 81
// console.log(exponent2(-2,5)) // => -32

// find nth fib num
const nthFib = function(n) {
    let arr = []
    if (n === 0) {
        return 0
    }
    else if (n === 1) {
        return 1
    }
    else {
        return nthFib(n-1) + nthFib(n-2) 
    }
}
// 0 1 1 2 3 5 8 13
// console.log(nthFib(2)) // => 1
// console.log(nthFib(3)) // => 2
// console.log(nthFib(4)) // => 3
// console.log(nthFib(5)) // => 5

const Fib = function(n) {
    // if (n < 3) {
    //     return [0,1].slice(0,n)
    // }
    if (n === 0) {
        return [0]
    }
    else if (n === 1) {
        return [0,1]
    }
    // else {
    let fibs = Fib(n-1);
    fibs.push(fibs[fibs.length-1] + fibs[fibs.length-2])
    // }
    return fibs;
}
console.log(Fib(2)) // => [0,1,1]
console.log(Fib(3)) // => [0,1,1,2]
console.log(Fib(5)) // => [0,1,1,2,3,5]