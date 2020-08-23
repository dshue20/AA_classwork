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

    insert(val){
        const node = new TreeNode(val);
        if (!this.root){
            this.root = node;
        } else {
            let curr = this.root;
            while (curr){
                if (val < curr.val){
                    if (!curr.left){
                        curr.left = node;
                        curr = null;
                    } else {
                        curr = curr.left;
                    }
                } else {
                    if (!curr.right){
                        curr.right = node;
                        curr = null;
                    } else {
                        curr = curr.right;
                    }
                }
            }
        }
    }

    searchRecur(val, root=this.root){
        if (!root){
            return false;
        } else if (root.val === val){
            return true;
        } else if (val < root.val){
            return this.searchRecur(val, root.left)
        } else {
            return this.searchRecur(val, root.right)
        }
    }

    searchIter(val){
        if (!this.root) return false;
        let root = this.root;
        while (root){
            if (root.val === val){
                return true
            } else if (val < root.val){
                root = root.left;
            } else {
                root = root.right;
            }
        }
        return false;
    }
}

module.exports = {
    TreeNode,
    BST
};