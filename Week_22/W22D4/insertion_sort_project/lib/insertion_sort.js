function insertionSort(arr) {
    for (let i=1; i < arr.length; i++){
        let toInsert = arr[i];
        for (var j=i-1; j >= 0 && arr[j] > toInsert; j--){
            arr[j+1] = arr[j];
        }
        arr[j+1] = toInsert;
    }
    return arr;
}

module.exports = {
    insertionSort
};