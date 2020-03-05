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
        const parentIdx = this.getParent(idx);
        if (this.array[idx] > this.array[parentIdx]){
            [this.array[idx], this.array[parentIdx]] = [this.array[parentIdx], this.array[idx]];
            this.siftUp(parentIdx);
        };
    }

    insert(val){
        this.array.push(val);
        this.siftUp(this.array.length-1);
    }

    siftDown(idx){ 
        if (this.getLeftChild(idx) >= this.array.length) return;
        const leftIdx = this.getLeftChild(idx);
        const rightIdx = this.getRightChild(idx);
        const max = this.array[leftIdx] > this.array[rightIdx] || !this.array[rightIdx] ? leftIdx : rightIdx;
        if (this.array[idx] < this.array[max]){
            [this.array[idx], this.array[max]] = [this.array[max], this.array[idx]];
            this.siftDown(max);
        };
    }

    deleteMax(){
        if (this.array.length === 1) return null;
        [this.array[1], this.array[this.array.length-1]] = [this.array[this.array.length-1], this.array[1]];
        const max = this.array.pop();
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