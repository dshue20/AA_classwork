function binarySearch(array, target) {
    if (array.length === 0) return false;
    let midIdx = Math.floor(array.length/2);
    if (target < array[midIdx]){
        return binarySearch(array.slice(0,midIdx), target)
    } else if (target > array[midIdx]){
        return binarySearch(array.slice(midIdx+1), target)
    } else {
        return true;
    }
}

function binarySearchIndex(array, target) {
    if (array.length === 0) return -1;
    let midIdx = Math.floor(array.length/2);
    if (target < array[midIdx]){
        return binarySearchIndex(array.slice(0,midIdx), target)
    } else if (target > array[midIdx]){
        let result = binarySearchIndex(array.slice(midIdx+1), target);
        return result === -1 ? -1 : result + midIdx + 1;
    } else {
        return midIdx;
    }
}

console.log(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 12));


module.exports = {
    binarySearch,
    binarySearchIndex
};