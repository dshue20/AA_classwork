function numRegions(graph) {
    let visited = new Set();
    let unvisited = Object.keys(graph);
    let regions = 0;
    while (unvisited.length){
        let queue = [unvisited[0]];
        while (queue.length){
            node = queue.shift();
            unvisited = unvisited.filter(val => val != node);
            visited.add(node);
            graph[node].forEach(neighbor => {
                if (!visited.has(neighbor)) queue.push(neighbor)
            });
        };
        regions++;
    }
    return regions;
}

module.exports = {
    numRegions
};