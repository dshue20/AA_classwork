class MaxHeap {
    constructor(){
        this.array = [null];
    }

    getParent(idx){
        return Math.floor(idx/2);
    }

    getLeftChild(idx){
        return idx*2;
    }

    getRightChild(idx){
        return idx*2+1;
    }

    siftUp(idx){
        if (idx === 1) return;
        if (this.array[idx] > this.array[this.getParent(idx)]){
            [this.array[idx], this.array[this.getParent(idx)]] = [this.array[this.getParent(idx)], this.array[idx]];
        } else {
            return;
        }
        this.siftUp(this.getParent(idx));
    }

    insert(val){
        this.array.push(val);
        this.siftUp(this.array.length-1);
    }

    siftDown(idx){ 
        let left = this.getLeftChild(idx); 
        let right = this.getRightChild(idx); 
        let max = this.array[left] > this.array[right] || !this.array[right] ? left : right;
        if (!this.array[left]) return;
        if (this.array[idx] < this.array[max]){
            [this.array[idx], this.array[max]] = [this.array[max], this.array[idx]];
        } else {
            return;
        };
        this.siftDown(max);
    }

    deleteMax(){
        if (this.array.length === 1) return null;
        [this.array[this.array.length-1], this.array[1]] = [this.array[1], this.array[this.array.length-1]];
        let max = this.array.pop();
        if (this.array.length === 1) return max;
        this.siftDown(1);
        return max;
    }
}

var findKthLargest = function(nums, k) {
    return nums.sort(function(num1, num2){ return num1 - num2 })[nums.length-k];
};

module.exports = {
    MaxHeap
};