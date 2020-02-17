// ============================================================================
// Implementation Exercise: Singly Linked List
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Singly Linked List and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Linked List reading!
//
// -----------
// Let's Code!
// -----------

// TODO: Implement a Linked List Node class here
class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }

}

// TODO: Implement a Singly Linked List class here
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // TODO: Implement the addToTail method here
    addToTail(val) {
        const node = new Node(val);
        if (this.tail) this.tail.next = node;
        if (!this.head) this.head = node;
        this.tail = node;
        this.length++;
        return this;
    }

    // TODO: Implement the removeTail method here
    removeTail() {
        let node = this.tail;
        if (this.length === 0) {
            return undefined;
        } else if (this.length === 1){
            this.head = null;
            this.tail = null;
        } else {
            let check = this.head;
            while (check.next != this.tail){
                check = check.next;
            };
            this.tail = check;
            this.tail.next = null;
        }
        this.length--;
        return node;
    }

    // TODO: Implement the addToHead method here
    addToHead(val) {
        let node = new Node(val);
        node.next = this.head;
        this.head = node;
        if (this.length === 0) this.tail = node;
        this.length++;
        return this;
    }

    // TODO: Implement the removeHead method here
    removeHead() {
        let head = this.head;
        if (this.length === 0) {
            return undefined;
        } else if (this.length === 1){
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        this.length--;
        return head;
    }

    // TODO: Implement the contains method here
    contains(target) {
        let node = this.head;
        while (node != null){
            if (node.value === target) return true;
            node = node.next;
        };
        return false;
    }

    // TODO: Implement the get method here
    get(index) {
        let node = this.head;
        while (index != 0){
            if (node.next === null) return null;
            node = node.next;
            index--;
        }
        return node;
    }

    // TODO: Implement the set method here
    set(index, val) {
        let node = this.get(index)
        if (node){
            node.value = val;
            return true;
        } else {
            return false;
        }
    }

    // TODO: Implement the insert method here
    insert(index, val) {
        if (!this.get(index)){
            return false;
        } else {
            if (index === 0){
                this.addToHead(val);
            } else if (index === this.length){
                this.addToTail(val);
            } else {
                let oldNode = this.get(index-1);
                let newNode = new Node(val);
                newNode.next = oldNode.next;
                oldNode.next = newNode;
                this.length++;
            }
            return true;
        }
    }

    // TODO: Implement the remove method here
    remove(index) {
        let node = this.head;
        while (index != 1){
            if (node.next === null) return undefined;
            node = node.next;
        };
        let removedNode = node.next;
        node.next = node.next.next;
        this.length--;
        return removedNode;
    }

    // TODO: Implement the size method here
    size() {
        return this.length;
    }
}

exports.Node = Node;
exports.LinkedList = LinkedList;