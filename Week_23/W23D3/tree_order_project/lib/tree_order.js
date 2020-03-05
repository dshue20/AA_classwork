function inOrderArray(root) {
    if (!root) return [];
    let arr = [];
    arr = arr.concat(inOrderArray(root.left))
    arr.push(root.val);
    arr = arr.concat(inOrderArray(root.right));
    return arr;
}

function postOrderArray(root) {

}


module.exports = {
    inOrderArray,
    postOrderArray
};