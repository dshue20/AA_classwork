function numRegions(graph) {
    const visited = new Set();
    const next = [];
    let regions = 0;
    let idx = 0;
    const keys = Object.keys(graph);
    while (visited.size !== keys.length){
        if (!visited.has(keys[idx])){
            visited.add(keys[idx]);
            for (let neighbor of graph[keys[idx]]) if (!visited.has(neighbor)) next.push(neighbor);
            while (next.length > 0){
                let curr = next.shift();
                visited.add(curr);
                for (let neighbor of graph[curr]) if (!visited.has(neighbor)) next.push(neighbor);
            };
            regions += 1;
        }
        idx += 1;
    };
    return regions;
}

module.exports = {
    numRegions
};