
class Graph {
  constructor() {
    this.adjList = {};
  }

  addVertex(vertex) {
    if (!this.adjList[vertex]) this.adjList[vertex] = [];
  }

  addEdges(srcValue, destValue) {
    this.addVertex(srcValue);
    this.addVertex(destValue);
    this.adjList[srcValue].push(destValue);
    this.adjList[destValue].push(srcValue);
  }

  buildGraph(edges) {
    edges.forEach(tuple => this.addEdges(...tuple));
    return this.adjList;
  }

  breadthFirstTraversal(startingVertex) {
    let queue = [startingVertex];
    let set = new Set();
    let vals = [];
    while (queue.length){
      let node = queue.shift();
      this.adjList[node].forEach(child => { 
        if (!set.has(child)) queue.push(child);
        set.add(child);
      });
      set.add(node);
      vals.push(node);
    };
    return vals;
  }

  depthFirstTraversalIterative(startingVertex) {
    let stack = [startingVertex];
    let set = new Set();
    let vals = [];
    while (stack.length){
      let node = stack.pop();      
      this.adjList[node].forEach(child => { 
        if (!set.has(child)) stack.push(child);
        set.add(child);
      });
      set.add(node);
      vals.push(node);
    };
    return vals;
  }

  depthFirstTraversalRecursive(startingVertex, visited = new Set(), vertices = []) {
    visited.add(startingVertex);
    vertices.push(startingVertex);
    this.adjList[startingVertex].forEach(child => {
      if (!visited.has(child)) this.depthFirstTraversalRecursive(child, visited, vertices);
      visited.add(child);
    });
    return vertices;
  }

}

module.exports = {
  Graph
};









