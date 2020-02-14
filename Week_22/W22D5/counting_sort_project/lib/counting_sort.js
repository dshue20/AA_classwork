function countingSort(arr, max) {
    let newArr = new Array(max+1).fill(0);
    let sortedArr = [];
    arr.forEach(ele => newArr[ele]++);
    for (let i=0; i < newArr.length; i++){
        while (newArr[i] > 0){
            sortedArr.push(i);
            newArr[i] -= 1;
        }
    }
    return sortedArr;
}


module.exports = {
    countingSort
};