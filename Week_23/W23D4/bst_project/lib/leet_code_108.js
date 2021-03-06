// View the full problem and run the test cases at:
//  https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function sortedArrayToBST(nums) {
    if (nums.length === 0) return null;
    if (nums.length === 1) return new TreeNode(nums[0]);
    const midIdx = Math.floor(nums.length/2);
    const root = new TreeNode(nums[midIdx]);
    root.left = sortedArrayToBST(nums.slice(0, midIdx));
    root.right = sortedArrayToBST(nums.slice(midIdx+1));
    return root;
}

// [-10,-3,0,5,9,11]z