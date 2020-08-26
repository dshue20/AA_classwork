class MaxHeap {
    constructor(){
        this.array = [null];
    }

    getParent(idx){
        return Math.floor(idx/2) / 1.0;
    }

    getLeftChild(idx){
        return idx*2;
    }

    getRightChild(idx){
        return idx*2 + 1;
    }

    siftUp(idx){
        if (idx === 0 || idx === 1) return;
        const parentVal = this.array[this.getParent(idx)];
        if (this.array[idx] > parentVal){
            this.array[this.getParent(idx)] = this.array[idx];
            this.array[idx] = parentVal;
            this.siftUp(this.getParent(idx));
        };
    }

    insert(val){
        this.array.push(val);
        const lastIdx = this.array.length - 1;
        if (this.array[lastIdx] > this.array[this.getParent(lastIdx)]) this.siftUp(lastIdx);
    }

    siftDown(idx){
        if (this.getLeftChild(idx) >= this.array.length) return;

        let max;
        if (this.getRightChild(idx) >= this.array.length){
            max = this.getLeftChild(idx);
        } else {
            max = Math.max(this.array[this.getLeftChild(idx)], this.array[this.getRightChild(idx)]) === this.array[this.getLeftChild(idx)] ? this.getLeftChild(idx) : this.getRightChild(idx);
        };
        console.log(max, idx, this.array);
        const curr = this.array[idx];
        if (curr < this.array[max]){
            this.array[idx] = this.array[max];
            this.array[max] = curr;
            this.siftDown(max);
        };
    }

    deleteMax(){
        if (this.array.length === 1) return null;
        if (this.array.length === 2) return this.array.pop();
        const max = this.array[1];
        this.array[1] = this.array.pop();
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