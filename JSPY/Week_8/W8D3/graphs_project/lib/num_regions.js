function numRegions(graph) {
    const set = new Set();
    let regions = 0;
    for (key in graph) {
        if (!set.has(key)){
            regions += 1;
        }
        set.add(key);
        graph[key].forEach(neighbor => set.add(neighbor));
    };
    return regions;
}

module.exports = {
    numRegions
};