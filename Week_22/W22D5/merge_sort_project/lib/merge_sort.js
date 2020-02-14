function merge(array1, array2) {
    let merged = [];
    while (array1.length != 0 || array2.length != 0){
        if (array1.length === 0){
            return merged.concat(array2);
        } else if (array2.length === 0) {
            return merged.concat(array1);
        } else if (array1[0] <= array2[0]) {
            merged.push(array1.shift())
        } else {
            merged.push(array2.shift())
        };
    }
    return merged;
}

function mergeSort(array) {
    if (array.length <= 1) return array;
    let mid = array.length/2;
    let sortedLeft = mergeSort(array.slice(0,mid));
    let sortedRight = mergeSort(array.slice(mid));
    return merge(sortedLeft, sortedRight);
}

module.exports = {
    merge,
    mergeSort
};