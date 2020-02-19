function inOrderArray(root) {
    if (!root) return [];
    let arr = [];
    arr = arr.concat(inOrderArray(root.left));
    arr = arr.concat([root.val]);
    arr = arr.concat(inOrderArray(root.right));
    return arr;
}

function postOrderArray(root) {
    if (!root) return [];
    let arr = [];
    arr = arr.concat(postOrderArray(root.left));
    arr = arr.concat(postOrderArray(root.right));
    arr = arr.concat([root.val]);
    return arr;
}


module.exports = {
    inOrderArray,
    postOrderArray
};