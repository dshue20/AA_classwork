// ============================================================================
// Interview Problem: Linked List Intersection
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Write a function linkedListIntersection that returns the node at which the 
// intersection of two linked lists begins, or null if there is no such 
// intersection.
//
// ---------- 
// Example 1:
// ----------
// 
// Given the following two linked lists, list1 and list2, 
// linkedListIntersection(list1,list2) should return D 
// as the node of intersection.
// 
//    A → B → C
//             ↘
//               D → E → F
//             ↗
//        X → Y
//
// ---------- 
// Example 2:
// ----------
//
// Given the following two linked lists, list1 and list2, 
// linkedListIntersection(list1, list2) should return null 
// as there is no point of intersection.
// 
//    A → B → C → D
//
//    X → Y → Z
// 
// -----------
// Let's code!
// -----------
function linkedListIntersection(list1, list2) {
  // TODO: Implement the hasCycle function!
  let idx1 = getLength(list1.head) - 1;
  let idx2 = getLength(list2.head) - 1;
  if (list1.get(idx1) === list2.get(idx2)){
    while (idx1 && idx2){
      if (list1.get(idx1) != list2.get(idx2)) return list1.get(idx1+1);
      idx1--;
      idx2--;
    }
  }
  return null;
}

function getLength(listNode) {
  if (listNode.next === null) {
    return 1;
  } else {
    return getLength(listNode.next) + 1;
  }
}

// ----------------------------------------
// Given: Singly Linked List - Do Not Edit!
// ----------------------------------------
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addToTail(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0) return null;
    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }
}

// --------------------------------------
// Helper For Testing Only - Do Not Edit!
// --------------------------------------
var stringify = function(list) {
  var result = [];
  while(list !== null) {
    result.push(list.value);
    list = list.next;
  }
  return result.join("");
}

// let list1 = new LinkedList();
// let list2 = new LinkedList();

// list1.addToTail('A');
// list1.addToTail('B');
// list1.addToTail('C');
// list1.addToTail('D');
// list1.addToTail('E');
// list1.addToTail('F');

// list2.addToTail('X');
// list2.addToTail('Y');
// list2.addToTail('Z');

// let nodeD = list1.get(3);
// let nodeZ = list2.get(2);

// nodeZ.next = nodeD;

// console.log(stringify(linkedListIntersection(list1, list2)));

exports.Node = Node;
exports.LinkedList = LinkedList;
exports.linkedListIntersection = linkedListIntersection;
exports.stringify = stringify;
