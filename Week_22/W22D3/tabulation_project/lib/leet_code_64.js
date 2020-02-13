// Work through this problem on https://leetcode.com/problems/minimum-path-sum/ and use the specs given there.
// Feel free to use this file for scratch work.

function minPathSum(grid, x=0, y=0) {
    let firstEle = grid[y][x];
    // console.log('firstEle: ', firstEle);
    // console.log('y: ', y, 'x: ', x);
    if (y === grid.length - 1 && x === grid[0].length - 1){
        return firstEle;
    } else if (y === grid.length - 1){
        return firstEle + minPathSum(grid, x + 1, y);
    } else if (x === grid[0].length - 1){
        return firstEle + minPathSum(grid, x, y+1)
    } else {
        console.log(minPathSum(grid, x + 1, y))
        return Math.min(firstEle + minPathSum(grid, x + 1, y), firstEle + minPathSum(grid, x, y+1));
    }
}

console.log(minPathSum([
    [1,3,1],
    [1,5,1],
    [4,2,1]
  ]));