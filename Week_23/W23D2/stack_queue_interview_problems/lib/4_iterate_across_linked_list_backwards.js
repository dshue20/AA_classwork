// ============================================================================
// Interview Problem: Constant Time Stack Max
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Iterate over a Singly Linked List of primitives backwards. When finished, 
// return a string representing the original linked list's values backwards 
// in the following format:
//
//                             'A -> B -> C -> D' 
//
// ------------
// Constraints:
// ------------
//
// (1) Your function must be iterative, not recursive.
// (2) Your function must consume O(n) space.
// (3) Employee either a Stack, Queue, or some combination of the two in your
//     solution. (Implement any data structures you need, as you need them.)
//
//
// -----------
// Let's code!
// -----------

class Node {
    constructor(val){
        this.value = val;
        this.next = null;
    }
};

class Stack {
    constructor(){
        this.top = null;
        this.length = 0;
    }

    push(val){
        let node = new Node(val);
        node.next = this.top;
        this.top = node;
        this.length++;
        return this.length;
    }

    pop(){
        if (!this.top) return null;
        let node = this.top;
        this.top = this.top.next;
        this.length--;
        return node;
    }
}

function iterateAcrossLinkedListBackwards(linkedList) {
    // TODO: Implement the iterateAcrossLinkedListBackwards function here
    let stack = new Stack();
    let node = linkedList.head;
    while (node){
        stack.push(node.value);
        node = node.next;
    };
    let str = '';
    while (stack.length){
        str += stack.pop().value;
        if (stack.length) str += ' -> ';
    };
    return str;
}

exports.iterateAcrossLinkedListBackwards = iterateAcrossLinkedListBackwards;
