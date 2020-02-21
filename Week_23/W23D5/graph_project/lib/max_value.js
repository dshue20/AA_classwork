function maxValue(node, visited=new Set()) {
    let queue = [node];
    let max = -Infinity;
    while (queue.length){
        checkNode = queue.shift();
        if (checkNode.val > max) max = checkNode.val;
        visited.add(checkNode.val);
        checkNode.neighbors.forEach(neighbor => {
            if (!visited.has(neighbor.val)) queue.push(neighbor)
        });
    };
    return max;
}

module.exports = {
    maxValue
};