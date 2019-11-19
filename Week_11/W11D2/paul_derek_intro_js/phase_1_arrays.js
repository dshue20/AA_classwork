Array.prototype.uniq = function () {
    let unique = [];
    this.forEach(function(ele) {
        if (!unique.includes(ele)) {
            unique.push(ele);
        }
    });
    return unique;
}
// console.log([1,2,2,3,3,3].uniq())

Array.prototype.twoSum = function () {
   let idx = []
    for (i=0; i < this.length; i++) {
        for (j=0; j < this.length; j++) {
            if (this[i] + this[j] === 0 && i <= j)
                idx.push([i,j]);
        }
    }
    return idx;
}
// console.log([-2,0,2,6,6,-3,3,5].twoSum()) // => [[0,2],[1,1],[5,6]]


Array.prototype.transpose = function () {
    let transposed = []
    for ( i = 0; i < this[0].length; i++) {
        transposed.push([]);
        this.forEach(function (subArr) {
            transposed[i].push(subArr[i]);
        })
    }
    return transposed;
}

// console.log([[1,2],[3,4],[5,6]].transpose()) // => [[1,3,5],[2,4,6]]