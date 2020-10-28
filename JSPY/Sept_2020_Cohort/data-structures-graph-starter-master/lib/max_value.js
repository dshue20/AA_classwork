function maxValue(node, visited=new Set()) {
  let queue = [node];
  let max;
  while (queue.length){
    let curr = queue.shift();
    if (!max || curr.val > max) max = curr.val;
    curr.neighbors.forEach(neighbor => {
      if (!visited.has(neighbor)) queue.push(neighbor);
      visited.add(neighbor);
    })
    visited.add(curr);
  };
  return max;
}

module.exports = {
    maxValue
};