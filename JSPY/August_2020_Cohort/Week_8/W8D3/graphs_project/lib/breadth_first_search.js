function breadthFirstSearch(startingNode, targetVal) {
    const queue = [startingNode];
    const visited = new Set();
    while (queue.length){
        let curr = queue.shift();
        if (curr.val === targetVal) return curr;
        visited.add(curr.val);
        curr.neighbors.forEach(neighbor => {if (!visited.has(neighbor.val)) queue.push(neighbor)})
    };
    return null;
}

module.exports = {
    breadthFirstSearch
};