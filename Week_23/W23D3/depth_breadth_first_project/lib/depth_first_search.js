function depthFirstSearch(root, targetVal) {
    if (!root) return null;
    let found = null;
    if (root.val === targetVal) return root;
    found = found || depthFirstSearch(root.left, targetVal) || depthFirstSearch(root.right, targetVal);
    return found;
}


module.exports = {
    depthFirstSearch
};