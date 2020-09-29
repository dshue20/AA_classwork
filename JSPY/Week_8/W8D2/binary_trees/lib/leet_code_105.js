// View the full problem and run the test cases at:
//  https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

const { TreeNode } = require('./tree_node.js');


var buildTree = function(preorder, inorder) {
    if (!preorder.length) return null;
    const leftInorder = inorder.slice(0, inorder.indexOf(preorder[0]));
    const rightInorder = inorder.slice(inorder.indexOf(preorder[0]) + 1);
    const leftPreorder = preorder.slice(1, 1 + leftInorder.length);
    const rightPreorder = preorder.slice(1 + leftPreorder.length);
    return new TreeNode(preorder[0], buildTree(leftPreorder, leftInorder), buildTree(rightPreorder, rightInorder));
};
