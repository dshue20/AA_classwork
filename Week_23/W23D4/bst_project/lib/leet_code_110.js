// View the full problem and run the test cases at:
//  https://leetcode.com/problems/balanced-binary-tree/


var height = function(root){
    if (!root) return -1;
    return 1 + Math.max(height(root.left), height(root.right));
}

var isBalanced = function(root) {
    if (!root) return true;
    const balanced = Math.abs(height(root.left) - height(root.right)) <= 1;
    return balanced && isBalanced(root.left) && isBalanced(root.right);
};