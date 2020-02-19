function treeSum(root) {
    if (!root) return 0;
    let sum = 0;
    let queue = [root];
    while (queue.length){
        let node = queue.shift();
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        sum += node.val;
    };
    return sum;
}


module.exports = {
    treeSum
};