// ============================================================================
// Interview Problem: StackQueue
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement your preferred Stack implementation, including the methods:
//
//   - Push 
//   - Pop 
//   - Size
//
// Then, implement a Queue by instantiating two Stack instances for storage.
//
// The StackQueue implementation should include the following methods:
//
//   - Enqueue
//   - Dequeue
//   - Size
//
// -----------
// Let's code!
// -----------

class Node {
    // TODO: Implement the Node class!
    constructor(val){
        this.value = val.value ? val.value : val;
        this.next = null;
    }
}

class Stack {
    // TODO: Implement the Stack class!
    constructor(){
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }

    push(val){
        let node = new Node(val);
        if (!this.top){
            this.bottom = node;
        } else {
            node.next = this.top;
        }
        this.top = node;
        this.length++;
        return this.length;
    }

    pop(){
        let node = this.top;
        if (!this.length){
            return null;
        } else if (this.length === 1){
            this.bottom = null;
            this.top = null;
        } else {
            this.top = this.top.next;
        }
        this.length--;
        return node;
    }

    size(){
        return this.length;
    }
}

class StackQueue {
    // TODO: Implement the StackQueue class!
    constructor(){
        this.inStack = new Stack();
        this.outStack = new Stack();
        this.front = null;
        this.back = null;
        this.length = 0;
    }

    enqueue(val){
        let node = new Node(val);
        if (!this.front){
            this.front = node;
        } else {
            this.back.next = node;
        };
        this.back = node;
        this.length++;
        this.inStack.push(node);
        return this.length;
    }

    dequeue(){
        if (!this.length){
            return null;
        } else if (this.length === 1){
            this.back = null;
            this.front = null;
        } else {
            this.front = this.front.next;
        }
        this.length--;
        while (this.inStack.length > 0){
            this.outStack.push(this.inStack.pop());
        };
        return this.outStack.pop();
    }

    size(){
        return this.length;
    }
};

exports.Node = Node;
exports.Stack = Stack;
exports.StackQueue = StackQueue;
