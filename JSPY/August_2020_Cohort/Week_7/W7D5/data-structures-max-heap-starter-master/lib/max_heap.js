class MaxHeap {
  constructor(){
    this.array = [null];
  }

  getParent(idx){
    return Math.floor(idx/2);
  }

  getLeftChild(idx){
    return idx*2
  }

  getRightChild(idx){
    return idx*2+1
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
    const leftIdx = this.getLeftChild(idx);
    const rightIdx = this.getRightChild(idx);
    const leftVal = this.array[leftIdx];
    const rightVal = this.array[rightIdx];

    const toSwap = leftVal > rightVal || !rightVal ? leftIdx : rightIdx;

    if (toSwap >= this.array.length) return;
    
    if (this.array[idx] < this.array[toSwap]){
      [this.array[idx], this.array[toSwap]] = [this.array[toSwap], this.array[idx]];
      this.siftDown(toSwap);
    }
    return this.array;
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

let heap2 = new MaxHeap();
heap2.array = [null, 5, 30, 40, 20, 25, 16];
heap2.siftDown(1);

module.exports = {
  MaxHeap
};
