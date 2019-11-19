Array.prototype.bubbleSort = function() {
    for (i=0; i < this.length; i++) {
        for (j=0; j < this.length; j++) {
            if (this[i] > this[j] && i < j) {
                [this[i], this[j]] = [this[j], this[i]]
            }
        }
    }
    return this;
}
// console.log([5,1,4,2,8].bubbleSort()) // => [1,2,4,5,8]
// console.log([7,4,2,-1,-3].bubbleSort()) // =>[-3,-1,2,4,7]
// console.log([1,2,4,2,5].bubbleSort()) // => [1,2,2,4,5]

String.prototype.subString = function () {
    let arr = []

    for ( i = 0; i < this.length; i++) {
       for (j = 1; j < this.length + 1; j++) {
           if (i < j) { 
            arr.push(this.slice(i, j))
           }
       }
    }
    return arr;
}
// let paul = "paul".subString()
// console.log(paul) // => ["p","pa","pau","paul","a","au","aul","u","ul","l"]
// console.log(paul.length) // => 10