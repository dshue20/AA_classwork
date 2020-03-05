// View the full problem and run the test cases at:
//  https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

const { TreeNode } = require('./tree_node.js');


function buildTree(preorder, inorder) {
    if (!preorder.length && !inorder.length) return null;
    const root = new TreeNode(preorder[0]);
    const leftInorder = inorder.slice(0, inorder.indexOf(root.val));
    const rightInorder = inorder.slice(inorder.indexOf(root.val)+1);
    const leftPreorder = preorder.filter(val => leftInorder.includes(val));
    const rightPreorder = preorder.filter(val => rightInorder.includes(val));
    root.left = buildTree(leftPreorder, leftInorder);
    root.right = buildTree(rightPreorder, rightInorder);
    return root;
}
