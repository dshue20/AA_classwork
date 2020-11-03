function nodesAtDepth(root, depth){
  if (depth < 1) return 0;
  let level = 1;
  let queue = [root];
  while (level !== depth){
    let toAdd = [];
    while (queue.length){
      let curr = queue.shift();
      if (curr.left) toAdd.push(curr.left);
      if (curr.right) toAdd.push(curr.right);
    };
    level += 1;
    queue.push(...toAdd);
  };
  return queue.length;
}