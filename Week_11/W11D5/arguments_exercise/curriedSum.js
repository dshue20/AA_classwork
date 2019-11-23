function curriedSum(numArgs) {
    const numbers = [];
    function _curriedSum(num) {
        numbers.push(num);
        if (numbers.length === numArgs) {
            return numbers.reduce((a,b) => a + b, 0);
        }
        else {
            return _curriedSum;
        }
    };
    return _curriedSum;
};
// console.log(curriedSum(3)(4)(20)(6)); // => 30

Function.prototype.curry1 = function(numArgs) {
    const numbers = [];
    const func = this;
    function _curriedSum(num) {
        numbers.push(num);
        if (numbers.length === numArgs) {
            return func.apply(null, numbers)
        }
        else {
            return _curriedSum;
        }
    };
    return _curriedSum;
};

Function.prototype.curry2 = function(numArgs) {
    const numbers = [];
    const _curriedSum = (num) => {
        numbers.push(num);
        if (numbers.length === numArgs) {
            return this(...numbers);
        }
        else {
            return _curriedSum;
        }
    };
    return _curriedSum;
};

function sumThree(num1, num2, num3) {
    return num1 + num2 + num3;
};

console.log(sumThree.curry2(3)(4)(20)(6));