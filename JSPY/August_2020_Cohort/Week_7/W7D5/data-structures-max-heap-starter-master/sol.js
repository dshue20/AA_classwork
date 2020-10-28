function preorder(root){
  if (!root) return;

  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
}

function bfs(root){
  let queue = [root]; // [B, G]
  while (queue.length){
    let curr = queue.shift();
    console.log(curr);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);  
  }
}

function dfs(root){
  let stack = [root]; // [F, ]
  let seen = new Set();
  while (stack.length){
    let curr = stack[stack.length-1];
    if ((!curr.left && !curr.right) || seen.has(curr)) console.log(stack.pop());
    if (curr.right && !seen.has(curr)) stack.push(curr.right);
    if (curr.left && !seen.has(curr)) stack.push(curr.left);
    seen.add(curr);
  }
}