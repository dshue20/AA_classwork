class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}


class BST {
   constructor(){
       this.root = null;
   }

   insert(val, root=this.root){
       if (!this.root){
           this.root = new TreeNode(val);
           return;
       };

       if (val < root.val){
           if (!root.left){
               root.left = new TreeNode(val);
           } else {
               this.insert(val, root.left);
           }
       } else {
           if (!root.right){
               root.right = new TreeNode(val);
           } else {
               this.insert(val, root.right);
           }
       };
   }

   searchRecur(val, root=this.root){
       if (!root){
            return false;
       } else if (val === root.val){
           return true;
       } else if (val < root.val){
           return this.searchRecur(val, root.left);
       } else {
           return this.searchRecur(val, root.right);
       };
   }

   searchIter(val){
       let root = this.root;
       while (root){
           if (val === root.val){
               return true;
           } else if (val < root.val){
               root = root.left;
           } else {
               root = root.right;
           }
       };
       return false;
   }
}

module.exports = {
    TreeNode,
    BST
};