// you may assume that the array will always have a null element at the 0-th index
function isMaxHeap(array, idx=1) {
    if (array[idx] === undefined) return true;
    for (let i=idx*2; i < idx*4; i++){
        if (array[i] && array[idx] < array[i]) return false;
    }
    return isMaxHeap(array, idx*2);
}

console.log(isMaxHeap([null, 10, 5, 7, 2, 6]));
console.log(isMaxHeap([null, 0, 5, 7]));

module.exports = {
    isMaxHeap
};