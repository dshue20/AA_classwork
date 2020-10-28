function breadthFirstSearch(startingNode, targetVal) {
  let queue = [startingNode];
  let visited = new Set();
  while (queue.length){
    let node = queue.shift();
    if (node.val === targetVal) return node;
    node.neighbors.forEach(neighbor => {
      if (!visited.has(neighbor)) queue.push(neighbor);
      visited.add(neighbor);
    })
    visited.add(node);
  };
  return null;
}

module.exports = {
    breadthFirstSearch
};