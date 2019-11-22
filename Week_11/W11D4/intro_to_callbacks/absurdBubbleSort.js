const readline = require("readline");

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const absurdBubbleSort = function(arr, sortCompletionCallback) {
    const outerBubbleSortLoop = function(madeAnySwaps) {
        madeAnySwaps ? innerBubbleSort(arr, 0, false, outerBubbleSortLoop) : sortCompletionCallback(arr);
    };

    outerBubbleSortLoop(true);
};

const askIfGreaterThan = function(el1, el2, callback) {
    reader.question(`Is ${el1} greater than ${el2}? `, function(res) {
        return (res === "yes") ? callback(true) : callback(false);
    });
};

// askIfGreaterThan(1, 2, x => console.log(x));

const innerBubbleSort = function(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if (i < arr.length - 1) {
        // console.log(`inner i: ${i}`)
        askIfGreaterThan(arr[i], arr[i+1], function(isGreaterThan) {
            if (isGreaterThan) {
                // console.log("inner");
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
                madeAnySwaps = true;
            };
            innerBubbleSort(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
        });
    }
    else if (i == arr.length - 1) {
        // console.log(`outer i: ${i}`)
        outerBubbleSortLoop(madeAnySwaps);
        console.log(arr);
    }
};

absurdBubbleSort([2,1,0],0,false, () => console.log('In outer loop'));