function breadthFirstArray(root) {
    if (!root) return [];
    let children = [];
    let queue = [root];
    while (queue.length > 0){
        let curr = queue.shift();
        if (curr.left) queue.push(curr.left);
        if (curr.right) queue.push(curr.right);
        children.push(curr.val);
    };
    return children;
}

module.exports = {
    breadthFirstArray
};