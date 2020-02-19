function breadthFirstArray(root) {
    let queue = [root];
    let arr = [];
    while (queue.length){
        let node = queue.shift();
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        arr.push(node.val);
    };
    return arr;
}

module.exports = {
    breadthFirstArray
};