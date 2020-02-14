function radixSort(arr) {
    if (!(arr instanceof Array)) return null;
    const numDigits = Math.max(...arr).toString().length;
    for (let i=0; i < numDigits; i++){
        let sorted = new Array(10).fill(null).map(ele => []);
        for (let j=0; j < arr.length; j++){
            let digit = Math.floor(arr[j]/(10**i)) % 10;
            sorted[digit].push(arr[j])
        }
        arr = [].concat(...sorted);
    }
    return arr;
}

module.exports = {
    radixSort
};