function merge(array1, array2) {
    let merged = [];
    while (array1.length > 0 && array2.length > 0){
        if (array1[0] < array2[0]){
            merged.push(array1.shift());
        } else {
            merged.push(array2.shift());
        };
    };
    if (array1.length === 0){
        merged = merged.concat(array2);
    } else {
        merged = merged.concat(array1)
    };
    return merged;
}

function mergeSort(array) {
    if (array.length <= 1) return array;
    const midIdx = Math.floor(array.length/2);
    const left = mergeSort(array.slice(0,midIdx));
    const right = mergeSort(array.slice(midIdx));
    return merge(left, right);
}

console.log(mergeSort([2, -1, 4, 3, 7, 3]));

module.exports = {
    merge,
    mergeSort
};