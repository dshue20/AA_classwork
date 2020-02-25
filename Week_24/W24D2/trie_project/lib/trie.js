class Node {
    constructor(){
        this.children = {};
        this.isTerminal = false;
    }
}

class Trie {
   constructor(){
       this.root = new Node();
   }

   insertRecur(word, root=this.root){
       let letter = word[0];
       if (!root.children[letter]) root.children[letter] = new Node();
       if (word.length === 1){
           root.children[letter].isTerminal = true;
           return;
       }
       this.insertRecur(word.slice(1), root.children[letter]);
   }

   insertIter(word){
        let root = this.root;
        for (let i=0; i<word.length; i++){
            if (!root.children[word[i]]) root.children[word[i]] = new Node();
            if (i === word.length-1) root.children[word[i]].isTerminal = true;
            root = root.children[word[i]];
        };
   }

   searchRecur(word, root=this.root){
       let letter = word[0];
       if (word.length === 1 && root.children[letter] && root.children[letter].isTerminal) return true;
       if (!root.children[letter]){
           return false;
       } else {
           return this.searchRecur(word.slice(1), root.children[letter]);
       };
   }

   searchIter(word){
        let root = this.root;
        for (let i=0; i<word.length; i++){
            if (!root.children[word[i]]) return false;
            if (i === word.length-1 && root.children[word[i]] && root.children[word[i]].isTerminal) return true;
            root = root.children[word[i]];
        };
        return false;
   }

    wordsWithPrefix(prefix, root=this.root){
        let words = [];
        if (root.isTerminal) words.push("");
        if (!prefix.length){
            for (let letter in root.children){
                let suffixes = this.wordsWithPrefix(prefix, root.children[letter]);
                suffixes.forEach(suffix => words.push(letter + suffix));
            }
        } else {
            let letter = root.children[prefix[0]];
            if (!letter){
                return [];
            } else {
                let suffixes = this.wordsWithPrefix(prefix.slice(1), letter);
                return suffixes.map(suffix => prefix[0] + suffix);
            }
        }
        return words;
    }
}

module.exports = {
    Node,
    Trie
};