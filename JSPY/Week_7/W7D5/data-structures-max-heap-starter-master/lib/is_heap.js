// you may assume that the array will always have a null element at the 0-th index
function isMaxHeap(array, idx=1) {
  if (!array[idx*2]) return true;
  return array[idx] > array[idx*2] && (array[idx] > array[idx*2+1] || !array[idx*2+1]) && isMaxHeap(array, idx*2) && isMaxHeap(array, idx*2+1);
}


module.exports = {
  isMaxHeap
};
