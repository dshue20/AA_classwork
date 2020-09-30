// function maxValue(node) {
//     const queue = [node];
//     const visited = new Set();
//     let max = -Infinity;
//     while (queue.length){
//         let curr = queue.shift();
//         if (curr.val > max) max = curr.val;
//         visited.add(curr);
//         curr.neighbors.forEach(neighbor => {if (!visited.has(neighbor)) queue.push(neighbor)})
//     };
//     return max;
// }

function maxValue(node, visited = new Set(), max = -Infinity){
    if (node.val > max) max = node.val;
    visited.add(node);
    node.neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) max = Math.max(max, maxValue(neighbor, visited, max))
    });
    return max;
}

module.exports = {
    maxValue
};