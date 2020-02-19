function treeHeight(root) {
    if (!root) return -1;
    let queue = [root];
    let count = 0;
    while (queue.length){
        let node = queue.shift();
        if (node.left){
            queue.push(node.left);
            count++;
        };
        if (node.right){
            queue.push(node.right);
            if (!node.left) count++;
        };
    };
    return count;
}


module.exports = {
    treeHeight
};