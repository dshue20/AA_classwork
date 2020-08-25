function maxValue(node, visited=new Set()) {
    let max = node.val;
    visited.add(node);
    let unvisited = [];
    for (let neighbor of node.neighbors) unvisited.push(neighbor);
    while (unvisited.length > 0){
        let curr = unvisited.shift();
        if (curr.val > max) max = curr.val;
        for (let neighbor of curr.neighbors) if (!visited.has(neighbor)) unvisited.push(neighbor);
        visited.add(curr);
    };
    return max;
}

module.exports = {
    maxValue
};