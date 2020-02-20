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
        let node = new TreeNode(val);
        if (!root){
            this.root = node;
        } else if (val < root.val){
            if (!root.left){
                root.left = node;
            } else {
                this.insert(val, root.left)
            }
        } else {
            if (!root.right){
                root.right = node;
            } else {
                this.insert(val, root.right)
            }
        }
        //console.log(this.root);
    }

    searchRecur(val, root=this.root){
        if (!root) return false;
        if (root.val === val) return true;
        return this.searchRecur(val, root.left) || this.searchRecur(val, root.right);
    }

    searchIter(val, root=this.root){
        while (root){
            if (root.val === val){
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