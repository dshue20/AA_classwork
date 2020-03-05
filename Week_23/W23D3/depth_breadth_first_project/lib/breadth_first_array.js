function breadthFirstArray(root) {
    let queue = [root];
    let arr = [];
    while (queue.length){
        let current = queue.shift();
        arr.push(current.val);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    };
    return arr;
}

module.exports = {
    breadthFirstArray
};