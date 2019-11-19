Array.prototype.myEach = function(cb) {
    for (i=0; i < this.length; i++) {
        cb(this[i]);
    }
}
// const log = num => console.log(num)
// console.log([1,2,3].myEach(log)) // => 1, 2, 3

Array.prototype.myMap = function(cb) {
    let arr = []
    this.myEach(function(ele) {
        arr.push(cb(ele));
    })
    return arr;
}
// const double = num => num * 2;
// console.log([1,2,3].myMap(double)) // => [2,4,6]

Array.prototype.myReduce = function(cb, initial=null) {
    let start = 0;
    if (initial === null) {
        let initial = this[0]
        start = 1
    }
    let total = initial;
    this.myEach(function(ele) {
        total = cb(total, ele)
    })
    return total;
}
// const sum = (num1, num2) => num1 + num2;
// console.log([1,2,3].myReduce(sum)) // => 6
// console.log([1,2,3].myReduce(sum,4)) // => 10