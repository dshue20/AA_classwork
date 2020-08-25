function breadthFirstSearch(startingNode, targetVal) {
    if (!startingNode) return null;
    if (startingNode.val === targetVal) return startingNode;
    let visited = new Set();
    visited.add(startingNode);
    let children = [];
    for (let child of startingNode.neighbors){
        children.push(child);
    }
    while (children.length > 0){
        let child = children.shift();
        if (child.val === targetVal) return child;
        for (let neighbor of child.neighbors){
            if (!visited.has(neighbor)) children.push(neighbor);
        };
        visited.add(child);
    };
    return null;
}

module.exports = {
    breadthFirstSearch
};