function quickSort(array) {
    return array.length <= 1 ? array : [...quickSort(array.slice(1).filter(ele => ele <= array[0])), array.shift(), ...quickSort(array.slice(1).filter(ele => ele > array[0]))]
}

console.log((quickSort([2, -1, 4, 3, 7, 3])));


module.exports = {
    quickSort
};