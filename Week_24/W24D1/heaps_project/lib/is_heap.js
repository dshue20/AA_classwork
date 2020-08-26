// you may assume that the array will always have a null element at the 0-th index
function isMaxHeap(array, idx=1) {
    for (let i=1; i < array.length/2; i++){
        if (array[i] < array[i*2] || array[i] < array[i*2+1]) return false;
    }
    return true;
}

console.log(isMaxHeap([null, 10, 5, 7, 2, 6]));
console.log(isMaxHeap([null, 0, 5, 7]));

module.exports = {
    isMaxHeap
};