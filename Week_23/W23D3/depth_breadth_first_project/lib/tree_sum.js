function treeSum(root) {
    if (!root) return 0;
    let sum = 0;
    let queue = [root];
    while (queue.length > 0){
        let curr = queue.shift();
        if (curr.left) queue.push(curr.left);
        if (curr.right) queue.push(curr.right);
        sum += curr.val;
    };
    return sum;
}


module.exports = {
    treeSum
};