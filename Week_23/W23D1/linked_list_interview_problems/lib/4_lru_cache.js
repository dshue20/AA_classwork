// ============================================================================
// Interview Problem: Design and Implement an LRU Cache
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Given the implementation of a Doubly Linked List, design and implement 
// an LRU, or Least Recently Used, cache.
//
// ------------
// Explanation:
// ------------
//
// An LRU Cache is a data structure valued for its constant time read and write
// operations. Its methods, get(key) and set(key, val), are both O(1), just
// like a Hash Table.
//
// However, unlike a Hash Table, instead of re-sizing once it reaches its
// maximum capacity for stored items, it instead removes the least recently
// used item from the cache, also in O(1) time.
//
// NOTE: We determine the item that is "Least Recently Used" by its most-recent
// "get" time, not just by its creation time!
//
// --------
// Example:
// --------
//
// const lruCache = new LRUCache(4);   => limit of 4 items
// lruCache.set('a', 'A');
// lruCache.set('b', 'B');
// lruCache.set('c', 'C');
// lruCache.set('d', 'D');
// lruCache.set('e', 'E');
//
// lruCache.get('c')                   => 'C'
// lruCache.get('b')                   => 'B'
//
// Item 'a' was removed because it was the oldest item by insertion/usage
//
// lruCache.get('a')                   => null
//
// Next, item 'e' is removed to make room, because it is the oldest by usage,
// which takes priority.
//
// lruCache.set('f', 'F');
//
// Item 'd' is also removed, because it was retrieved before item 'b' was
// last retrieved.
//
// lruCache.set('g', G);
//
// -----------
// Let's code!
// -----------
// TODO: Implement the LRUCacheItem class here
class LRUCacheItem {
  constructor(val = null, key = null) {
    this.val = val;
    this.key = key;
    this.node = null;
  }
}

// TODO: Implement the LRUCacheItem class here
class LRUCache {
  constructor(limit) {
    this.items = {};
    this.limit = limit;
    this.length = 0;
    this.list = new List();
  }

  // TODO: Implement the size method here
  size() {
    return this.length;
  }

  // TODO: Implement the get method here
  get(key) {
    let toGet = this.items[key];
    console.log(toGet);
    if (toGet){
      this.promote(toGet)
      return toGet.val;
    } else {
      return null;
    };
  }

  // TODO: Implement the set method here
  set(key, val) {
    if (this.isFull()) this.prune();
    this.items[key] = val;
    this.promote(this.items[key]);
    this.length++;
  }

  isFull() {
    if (this.length === this.limit) return true;
    return false;
  }

  prune() {
    let pruned = this.list.pop();
    delete this.items[pruned.key];
    this.length--;
  }

  promote(item) {
    this.list.moveToFront(item.node);
  }
}

// ----------------------------------------
// Given: Doubly Linked List - Do Not Edit!
// ----------------------------------------
class ListNode {
  constructor(val, prev = null, next = null) {
    this.prev = prev;
    this.val = val;
    this.next = next;
  }


  delete() {
    if (this.prev) this.prev.next = this.next;
    if (this.next) this.next.prev = this.prev;
  }
}

class List {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Insert at the head of the list.
  unshift(val) {
    if (this.head === null && this.tail === null) {
      this.head = new ListNode(val);
      this.tail = this.head;
    } else {
      this.head = new ListNode(val, null, this.head);
      this.head.next.prev = this.head;
    }

    return this.head;
  }

  // Delete at the head of the list.
  shift() {
    if (this.head === null && this.tail === null) {
      return null;
    } else {
      let head = this.head;
      this.head = this.head.next;
      head.delete();
      return head.val;
    }
  }

  // Insert at the end of the list.
  push(val) {
    if (this.head === null && this.tail === null) {
      this.head = this.tail = new ListNode(val);
    } else {
      this.tail = new ListNode(val, this.tail, null);
      this.tail.prev.next = this.tail;
    }

    return this.tail;
  }

  // Delete at the end of the list.
  pop() {
    if (this.head === null && this.tail === null) {
      return null;
    } else {
      let tail = this.tail;
      this.tail = this.tail.prev;
      tail.delete();
      return tail.val;
    }
  }

  // Move a node to the front of the List
  moveToFront(node) {
    if (node === this.tail) {
      this.pop();
    } else if (node === this.head) {
      return;
    } else {
      node.delete();
    }

    node.prev = node.next = null;

    // Don't delegate to shift, since we want to keep the same
    // object.

    if (this.head === null && this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }

  // Move a node to the end of the List
  moveToEnd(node) {
    if (node === this.head) {
      this.shift();
    } else if (node === this.tail) {
      return;
    } else {
      node.delete();
    }

    // Don't delegate to push, since we want to keep the same
    // object.

    node.prev = null;
    node.next = null;

    if (this.head === null && this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
  }
}

let lruCache = new LRUCache(10);
for (let i = 0; i < 9; i++) lruCache.set(i, i);
for (let j = 0; j < 9; j++) expect(lruCache.get(j)).to.equal(j);
console.log(lruCache);

exports.List = List;
exports.ListNode = ListNode;
exports.LRUCache = LRUCache;
exports.LRUCacheItem = LRUCacheItem;