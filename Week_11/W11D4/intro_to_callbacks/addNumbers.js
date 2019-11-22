const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const addNumbers = function(sum, numsLeft, completionCallback) {
    if (numsLeft === 0) {
        return completionCallback(sum);
    }
    else if (numsLeft > 0){
        reader.question("Input a number: ", function (res) {
            let toAdd = parseInt(res);
            sum += toAdd;
            console.log(sum);
            addNumbers(sum, numsLeft - 1, completionCallback);
        })
    }
    else {
        throw new Error("numsLeft < 0");
    }
};

console.log(addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`)));