function inOrderArray(root) {
  // if the root is null, return an empty array
  return root ? inOrderArray(root.left).concat(root.val).concat(inOrderArray(root.right)) : [];

  // get the array for visiting the left node
  // get the array for visiting the right node

  // return the left array concatenated with the root value
  //   concatenated with the right array
}

function postOrderArray(root) {
  // if the root is null, return an empty array
  return root ? postOrderArray(root.left).concat(postOrderArray(root.right)).concat(root.val) : [];

  // get the array for visiting the left node
  // get the array for visiting the right node

  // return the left array concatenated with the right array
  //   concatenated with the root value
}


module.exports = {
  inOrderArray,
  postOrderArray
};
