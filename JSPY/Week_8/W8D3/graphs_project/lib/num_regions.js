function numRegions(graph) {
    const set = new Set();
    let regions = 0;
    Object.keys(graph).forEach(key => {
        if (!set.has(key)){
            set.add(key);
            regions += 1;
        }
        graph[key].forEach(neighbor => set.add(neighbor));
    });
    return regions;
}

module.exports = {
    numRegions
};