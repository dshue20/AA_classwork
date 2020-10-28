function badTwoSum(arr, targetSum) {
  // Code goes here ...
}


function okayTwoSum1(arr, targetSum) {
  arr.sort()
  let i = 0, j = arr.length - 1

  while (i < j) {
    let currentSum = arr[i] + arr[j]
    if (currentSum > targetSum) {
      j -= 1
    } else if (currentSum < targetSum) {
      i += 1
    } else {
      return true
    }
  }

  return false
}

console.log(okayTwoSum1([0,1,5,7], 4));


function okayTwoSum2(arr, targetSum) {
  // Code goes here ...
}


function twoSum(arr, targetSum) {
  // Code goes here ...
}


function twoSumIndices(arr, targetSum) {
  // Code goes here ...
}
