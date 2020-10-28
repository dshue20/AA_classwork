function numRegions(graph) {
  let regions = 0;
  let visited = new Set();
  Object.keys(graph).forEach(key => {
    console.log(key, visited);
    if (!visited.has(key)){
      regions += 1;
      visited.add(key);
    }
    graph[key].forEach(val => visited.add(val));
  });
  return regions;
}

module.exports = {
    numRegions
};