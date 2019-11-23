const sum2 = (...args) => {
    let total = 0;
    args.forEach(ele => total += ele)
    return total;
}

function sum1(){
    let total = 0;
    //console.log(arguments);
    console.log([...arguments]);
    console.log(Array.from(arguments));
    for (let i = 0; i < arguments.length; i++){
        total += arguments[i]
    }
    return total;
}

console.log(sum2(1, 2, 3, 4) === 10);
console.log(sum1(1, 2, 3, 4, 5) === 15);