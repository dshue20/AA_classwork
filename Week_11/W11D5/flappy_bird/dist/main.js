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

/***/ "./src/bird.js":
/*!*********************!*\
  !*** ./src/bird.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bird; });\nconst CONSTANTS = {\n    GRAVITY: 0.8,\n    FLAP_SPEED: -8,\n    TERMINAL_VEL: 12,\n    BIRD_WIDTH: 40,\n    BIRD_HEIGHT: 30\n}\nclass Bird {\n    constructor(dimensions) {\n        this.velocity = 0;\n        this.dimensions = dimensions;\n        this.yPos = this.dimensions.height / 2;\n        this.xPos = this.dimensions.width / 3;\n    };\n    drawBird(ctx) {\n        ctx.fillStyle = \"yellow\";\n        ctx.fillRect(this.xPos, this.yPos, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\n    };\n\n    animate(ctx){\n        this.move();\n        this.drawBird(ctx);\n    }\n\n    move(){\n        this.yPos += this.velocity;\n        this.velocity += CONSTANTS.GRAVITY;\n    }\n    flap(){\n        this.velocity = CONSTANTS.FLAP_SPEED;\n    }\n\n    getBounds(){\n        return {\n            left: this.xPos,\n            right: this.xPos + CONSTANTS.BIRD_WIDTH,\n            top: this.yPos,\n            bottom: this.yPos + CONSTANTS.BIRD_HEIGHT\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/bird.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FlappyBird; });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bird */ \"./src/bird.js\");\n\n\n\nclass FlappyBird {\n  \n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.restart();\n    this.eventHandler();\n    //debugger;\n  };\n\n  animate() {\n    this.level.animate(this.ctx);\n    this.bird.animate(this.ctx);\n    if (this.running) {\n      requestAnimationFrame(this.animate.bind(this));\n    };\n  };\n\n  restart() {\n    this.running = false;\n    this.bird = new _bird__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n    this.animate();\n  };\n\n  play() {\n    this.running = true;\n    this.animate();\n  };\n\n  click(e) {\n    if (!this.running) {\n      this.play();\n    };\n    this.bird.flap();\n  };\n\n  eventHandler(){\n    this.clickHandler = this.click.bind(this);\n    this.ctx.canvas.addEventListener(\"mousedown\", this.clickHandler)\n  };\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('bird-game');\nconst game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\ngame.restart;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst PIPE_CONSTANTS = {\n  WIDTH: 60,\n  GAP_SIZE: 150,\n  PIPE_SPACING: 220,\n  PIPE_SPEED: 2\n}\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    const initialPipeDistance = this.dimensions.width + PIPE_CONSTANTS.PIPE_SPACING;\n    this.pipes = [\n      this.pipe(initialPipeDistance),\n      this.pipe(initialPipeDistance + PIPE_CONSTANTS.PIPE_SPACING),\n      this.pipe(initialPipeDistance + 2 * PIPE_CONSTANTS.PIPE_SPACING)\n    ];\n  }\n\n  drawBackground(ctx) {\n    ctx.fillStyle = \"skyblue\";\n    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  animate(ctx) {\n    this.drawBackground(ctx);\n    this.movePipes();\n    this.drawPipes(ctx);\n  }\n\n  movePipes(){\n    this.pipes.forEach(pipe => {\n      pipe.topPipe.left -= PIPE_CONSTANTS.PIPE_SPEED;\n      pipe.topPipe.right -= PIPE_CONSTANTS.PIPE_SPEED;\n      pipe.bottomPipe.left -= PIPE_CONSTANTS.PIPE_SPEED;\n      pipe.bottomPipe.right -= PIPE_CONSTANTS.PIPE_SPEED;\n    });\n    if (this.pipes[0].topPipe.right <= 0){\n      this.pipes.shift();\n      const xSpacing = this.pipes[1].topPipe.left + PIPE_CONSTANTS.PIPE_SPACING;\n      this.pipes.push(this.pipe(xSpacing));\n    }\n  }\n\n  pipe(x){\n    const lengthRange = this.dimensions.height - PIPE_CONSTANTS.GAP_SIZE;\n    const pipeLength =  (Math.random() * lengthRange);\n    const pipe = {\n      topPipe: {\n        left: x,\n        right: PIPE_CONSTANTS.WIDTH + x,\n        top: 0,\n        bottom: pipeLength\n      },\n      bottomPipe: {\n        left: x,\n        right: PIPE_CONSTANTS.WIDTH + x,\n        top: pipeLength + PIPE_CONSTANTS.GAP_SIZE,\n        bottom: this.dimensions.height\n      }\n    }\n    return pipe;\n  }\n\n  drawPipes(ctx) {\n    this.pipes.forEach(pipe => {\n      ctx.fillStyle = \"green\";\n      //top pipe\n      ctx.fillRect(\n        pipe.topPipe.left,\n        pipe.topPipe.top,\n        PIPE_CONSTANTS.WIDTH,\n        pipe.topPipe.bottom - pipe.topPipe.top\n      )\n      //bottom pipe\n      ctx.fillRect(\n        pipe.bottomPipe.left,\n        pipe.bottomPipe.top,\n        PIPE_CONSTANTS.WIDTH,\n        pipe.bottomPipe.bottom - pipe.bottomPipe.top\n      )\n    })\n  }\n\n  collidesWith(bounds) {\n    const touch = function(point1, point2) {\n      if (point1.left > point2.right || point2.right < point2.left) {\n        return false;\n      };\n      if (point1.top > point2.bottom || point1.bottom < point2.top) {\n        return false;\n      };\n      return true;\n    }\n    let collision = false;\n  }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ })

/******/ });