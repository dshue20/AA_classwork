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
        if (!word) return;
        const letter = word[0];
        const node = root.children[letter] || new Node();
        if (word.length === 1) node.isTerminal = true;
        root.children[letter] = node;
        this.insertRecur(word.slice(1), node);
    }

    insertIter(word){
        let root = this.root;
        for (let i=0; i<word.length; i++){
            const letter = word[i];
            const node = root.children[letter] || new Node();
            if (i === word.length-1) node.isTerminal = true;
            root.children[letter] = node;
            root = node;
        }
    }

    searchRecur(word, root=this.root){
        const letter = word[0];
        if (!root.children[letter]) return false;
        if (word.length === 1 && root.children[letter].isTerminal) return true;
        return this.searchRecur(word.slice(1), root.children[letter]);
    }

    searchIter(word){
        let root = this.root;
        for (let i=0; i<word.length; i++){
            const letter = word[i];
            if (!root.children[letter]) return false;
            if (i === word.length-1 && root.children[letter].isTerminal) return true;
            root = root.children[letter];
        };
        return false;
    }

    wordsWithPrefix(prefix){
        let root = this.root;
        let prefixIsWord = false;
        for (let i=0; i<prefix.length; i++){
            const letter = prefix[i];
            if (!root.children[letter]) return [];
            root = root.children[letter];
            if (i === prefix.length-1 && root.isTerminal) prefixIsWord = true;
        };
        const words = this.allWords(root).map(word => prefix + word);
        if (prefixIsWord) words.push(prefix);
        return words;
    }

    allWords(root=this.root){
        let words = [];
        Object.keys(root.children).forEach(letter => {
            if (root.children[letter].isTerminal) words.push(letter);
            words = words.concat(this.allWords(root.children[letter]).map(word => letter + word));
        });
        return words;
    }
}

module.exports = {
    Node,
    Trie
};