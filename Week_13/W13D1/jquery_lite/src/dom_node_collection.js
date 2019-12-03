class DOMNodeCollection {
    constructor(htmlEls){
        this.htmlEls = htmlEls;
        return "hello";
    }
    html(str){
        if (!str) {
            return this.htmlEls[0].innerHTML;
        } else {
            this.htmlEls.forEach((el) => {
                el.innerHTML = str;
            })
        }
    }
    empty(){
        this.htmlEls.forEach(node => node.innerHTML = '');
    }
    append(arg){
        this.htmlEls.forEach(node => node.innerHTML += arg.outerHTML);
    }
    attr(key, value){
        //if arg, then set. Else get
        if (!value) {
            return this.htmlEls.getAttribute(key);
        }
        else {
            this.htmlEls.setAttribute(key, value);
        }
    }
    addClass(className){
        this.attr('class', className);
    }
    removeClass(className){
        this.htmlEls.classList.remove(className);
    }
    children() {
        let arr = [];
        this.htmlEls.forEach(node => {arr = arr.concat(Array.from(node.children))});
        return new DOMNodeCollection(arr);
    }
    parent(){
        let arr = [];
        this.htmlEls.forEach(node => arr.push(node.parentNode));
        return new DOMNodeCollection(arr);
    }
    find(attr){
        let arr = [];
        this.children().htmlEls.forEach(node => arr.push(node.querySelectorAll(attr)));
        return new DOMNodeCollection(arr);
    }
    remove(){
        this.htmlEls.forEach(node => node.parentNode.removeChild(node));
    }
    on(event, cb){
        // debugger;
        // this.attr('cb', cb);
        this.htmlEls.forEach(node => {
            node.addEventListener(event, cb);
            node['cb'] = cb;
        });
    }
    off(event) {
        this.htmlEls.forEach(node => node.removeEventListener(event, node['cb']));
    }
}
module.exports = DOMNodeCollection;

// let test = $1('div');
// let test1 = test[0];
// let domNode = $1(test1);

// function() {
//     console.log("It works");
// }