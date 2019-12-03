/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n    constructor(htmlEls){\n        this.htmlEls = htmlEls;\n        return \"hello\";\n    }\n    html(str){\n        if (!str) {\n            return this.htmlEls[0].innerHTML;\n        } else {\n            this.htmlEls.forEach((el) => {\n                el.innerHTML = str;\n            })\n        }\n    }\n    empty(){\n        this.htmlEls.forEach(node => node.innerHTML = '');\n    }\n    append(arg){\n        this.htmlEls.forEach(node => node.innerHTML += arg.outerHTML);\n    }\n    attr(key, value){\n        //if arg, then set. Else get\n        if (!value) {\n            return this.htmlEls.getAttribute(key);\n        }\n        else {\n            this.htmlEls.setAttribute(key, value);\n        }\n    }\n    addClass(className){\n        this.attr('class', className);\n    }\n    removeClass(className){\n        this.htmlEls.classList.remove(className);\n    }\n    children() {\n        let arr = [];\n        this.htmlEls.forEach(node => {arr = arr.concat(Array.from(node.children))});\n        return new DOMNodeCollection(arr);\n    }\n    parent(){\n        let arr = [];\n        this.htmlEls.forEach(node => arr.push(node.parentNode));\n        return new DOMNodeCollection(arr);\n    }\n    find(attr){\n        let arr = [];\n        this.children().htmlEls.forEach(node => arr.push(node.querySelectorAll(attr)));\n        return new DOMNodeCollection(arr);\n    }\n    remove(){\n        this.htmlEls.forEach(node => node.parentNode.removeChild(node));\n    }\n    on(event, cb){\n        // debugger;\n        // this.attr('cb', cb);\n        this.htmlEls.forEach(node => {\n            node.addEventListener(event, cb);\n            node['cb'] = cb;\n        });\n    }\n    off(event) {\n        this.htmlEls.forEach(node => node.removeEventListener(event, node['cb']));\n    }\n}\nmodule.exports = DOMNodeCollection;\n\n// let test = $1('div');\n// let test1 = test[0];\n// let domNode = $1(test1);\n\n// function() {\n//     console.log(\"It works\");\n// }\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nfunction qSelector(arg, ...func){\n    let queue = [];\n    if (func) queue = queue.concat(func);\n    //debugger;\n    if (document.readyState === 'complete') {\n        queue.forEach(func => func());\n        //debugger;\n    }\n    //debugger;\n    if (typeof arg === 'string') {\n        const list = document.querySelectorAll(arg);\n        const listArr = Array.from(list);\n        return listArr;\n    }\n    else if (arg instanceof HTMLElement) {\n        const domNodeCol = new DOMNodeCollection([arg]);\n        return domNodeCol;\n    }\n};\n\nwindow.$1 = qSelector;\nwindow.DOMNodeCollection = DOMNodeCollection;\n\nfunction func1(){\n    console.log('func 1')\n}\nfunction func2(){\n    console.log('func 2')\n}\nfunction func3(){\n    console.log('func 3')\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });