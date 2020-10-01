function inOrderArray(root) {
    if (!root.length) return null;

    let left = inOrderArray(root.left);
    let right = inOrderArray(root.right);
    return left.push(right).push(root.val);
}

function postOrderArray(root){
    if (!root.left && !root.right) return null;

    return [
        postOrderArray(root.left),
        postOrderArray(root.val),
        postOrderArray(root.right)
    ];
}

module.exports = {
    inOrderArray,
    postOrderArray
};