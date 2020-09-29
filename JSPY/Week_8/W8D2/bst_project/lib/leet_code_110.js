// View the full problem and run the test cases at:
//  https://leetcode.com/problems/balanced-binary-tree/


var isBalanced = function(root) {
    if (!root) return true;
    return Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right);
};

var getHeight = function(root){
    if (!root) return 0;
    return Math.max(1 + getHeight(root.left), 1 + getHeight(root.right));
}