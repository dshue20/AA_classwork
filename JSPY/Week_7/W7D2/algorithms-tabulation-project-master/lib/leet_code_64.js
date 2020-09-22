// Work through this problem on https://leetcode.com/problems/minimum-path-sum/
// and use the specs given there. Feel free to use this file for scratch work.

// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

// Note: You can only move either down or right at any point in time.

// Example:

// Input:
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// Output: 7
// Explanation: Because the path 1→3→1→1→1 minimizes the sum.

function minPathSum(grid) {
    let myPath = [...grid];

    for( let i=0 ; i< myPath.length;i++){
        for(let j=0; j<myPath[i].length;j++){
            if (i==0 && j-1 >=0){
                myPath[i][j] = grid[i][j] + grid[i][j-1]
            }
            if (j == 0 && i - 1 >= 0) {
                myPath[i][j] = grid[i][j] + grid[i-1][j]
            }
            if(i-1 >= 0 && j-1>=0){
                myPath[i][j] = grid[i][j] + Math.min(grid[i][j-1],grid[i - 1][j])
            }
        }
    }

    return myPath[myPath.length-1][myPath[0].length-1]
    
}

console.log(minPathSum([
    [1,3,1],
    [1,5,1],
    [4,2,1]
  ]));