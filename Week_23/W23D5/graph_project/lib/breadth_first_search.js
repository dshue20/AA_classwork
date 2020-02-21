function breadthFirstSearch(startingNode, targetVal) {
    let visited = new Set();
    let queue = [startingNode];
    while (queue.length){
        node = queue.shift();
        if (node.val === targetVal) return node;
        visited.add(node.val);
        node.neighbors.forEach(neighbor => {
            if (!visited.has(neighbor.val)) queue.push(neighbor)
        });
    };
    return null;
}

module.exports = {
    breadthFirstSearch
};