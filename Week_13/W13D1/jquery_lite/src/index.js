const DOMNodeCollection = require('./dom_node_collection.js');

function qSelector(arg, ...func){
    let queue = [];
    if (func) queue = queue.concat(func);
    //debugger;
    if (document.readyState === 'complete') {
        queue.forEach(func => func());
        //debugger;
    }
    //debugger;
    if (typeof arg === 'string') {
        const list = document.querySelectorAll(arg);
        const listArr = Array.from(list);
        return listArr;
    }
    else if (arg instanceof HTMLElement) {
        const domNodeCol = new DOMNodeCollection([arg]);
        return domNodeCol;
    }
};

window.$1 = qSelector;
window.DOMNodeCollection = DOMNodeCollection;

function func1(){
    console.log('func 1')
}
function func2(){
    console.log('func 2')
}
function func3(){
    console.log('func 3')
}