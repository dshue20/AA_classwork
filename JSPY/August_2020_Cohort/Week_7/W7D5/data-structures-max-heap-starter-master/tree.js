// pre-order traversal:
// - current
// - recurse on left
// - recurse on right

function preorder(root){
  if (!root) return;

  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
  // F, B, A, D, C, E, G, I, H
}

function bfs(root){

}

// post-order traversal:
// - recurse on left
// - recurse on right
// - current

function dfs(root){

}