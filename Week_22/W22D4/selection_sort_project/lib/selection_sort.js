function swap(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
}

function selectionSort(arr) {
    for (let startIdx = 0; startIdx < arr.length - 1; startIdx++){
        let min = startIdx;
        for (let checkIdx = startIdx + 1; checkIdx < arr.length; checkIdx++){
            if (arr[checkIdx] < arr[min]) min = checkIdx;
            swap(arr, startIdx, min);
        }
    }
    return arr;
}

module.exports = {
    selectionSort,
    swap
};