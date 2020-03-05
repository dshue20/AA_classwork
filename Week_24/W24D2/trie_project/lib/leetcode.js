class Node{
    constructor(){
        this.children = {};
        this.final = false;
    }
}

var Trie = function() {
    this.root = new Node();
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word, root=this.root) {
    let letter = word[0];
    if (!root.children[letter]) root.children[letter] = new Node();
    if (word.length === 1) {
        root.children[letter].final = true;
        return;
    } else {
        this.insert(word.slice(1), root.children[letter]);
    }
};

Trie.prototype.search = function(word, root=this.root) {
    let letter = word[0];
    if (!root.children[letter]){
        return false;
    } else if (word.length === 1 && root.children[letter].final){
        return true;
    } else {
        return this.search(word.slice(1), root.children[letter]);
    };
};

Trie.prototype.startsWith = function(word, root=this.root) {
    let letter = word[0];
    if (!root.children[letter] || !word){
        return false;
    } else if (word.length === 1 && !root.children[letter].final){
        return true;
    } else {
        return this.startsWith(word.slice(1), root.children[letter]);
    };
};

const trie = new Trie();

trie.insert("apple");
console.log(trie.search("apple"));   // returns true
console.log(trie.search("app"));     // returns false
console.log(trie.startsWith("app")); // returns true)