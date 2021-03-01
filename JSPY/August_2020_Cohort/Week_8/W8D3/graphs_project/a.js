

function friendsOfRecursion(target, adjacencyList, visited, maxDistance, currentDistance) {
  if (currentDistance > maxDistance) return;

  visited.add(target);

  for (let nextFriend of adjacencyList[target]) {
    if (visited.has(nextFriend)) continue;
    friendsOfRecursion(nextFriend, adjacencyList, visited, maxDistance, currentDistance + 1);
  }
}


function friendsOf(adjacencyList, target, distance) {
  if (target in adjacencyList) {
    let visited = new Set();
    
    friendsOfRecursion(target, adjacencyList, visited, distance, 0)

    
    visited.delete(target);
    return Array.from(visited);
  }
}