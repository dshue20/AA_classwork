function quickSort(array) {
    if (array.length <= 1) return array;
    const pivot = array[0];
    const left = quickSort(array.slice(1).filter(x => x <= pivot));
    const right = quickSort(array.filter(x => x > pivot));
    return left.concat([pivot]).concat(right);
}

console.log((quickSort([2, -1, 4, 3, 7, 3])));


module.exports = {
    quickSort
};