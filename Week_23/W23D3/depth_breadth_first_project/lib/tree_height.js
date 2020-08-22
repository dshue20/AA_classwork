// function treeHeight(root) {
//     if (!root) return -1;
//     let height =0;
//     if (!root.left && !root.right) return height;
//     let children = [];
//     if (root.left) children.push(root.left);
//     if (root.right) children.push(root.right);
//     while (children.length > 0){
//         height += 1;
//         let length = children.length;
//         for (let i=0; i < length; i++){
//             let curr = children.shift();
//             if (curr.left) children.push(curr.left);
//             if (curr.right) children.push(curr.right);
//         };
//     };
//     return height;
// }

function treeHeight(root){
    if (!root) return -1;
    if (!root.left && !root.right) return 0;
    return Math.max(treeHeight(root.left)+1, treeHeight(root.right)+1);
}

module.exports = {
    treeHeight
};