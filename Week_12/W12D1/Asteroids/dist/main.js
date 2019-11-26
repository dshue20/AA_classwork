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

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nconst DEFAULTS = {color: \"gray\", radius: 20};\n\nfunction Asteroid(options) {\n  options = options || {};\n  options.color = DEFAULTS[\"color\"];\n  options.radius = DEFAULTS[\"radius\"];\n  options.vel = Util.randomVec(5);\n  options.pos = options[\"pos\"];\n  options.game = options[\"game\"];\n  MovingObject.call(this, options);\n}\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collideWith = function(otherObject) {\n  if (otherObject instanceof Ship) { otherObject.relocate() };\n}\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nconst CONSTANTS = {width: 1000, height: 1000, num_asteroids: 10}\n\nfunction Game (ctx) {\n  this.ctx = ctx;\n  this.asteroids = [];\n  this.addObjects();\n}\n\nGame.prototype.randomPosition = function() {\n  return [Math.floor(Math.random() * CONSTANTS[\"width\"]), Math.floor(Math.random() * CONSTANTS[\"height\"])];\n}\n\nGame.prototype.addObjects = function() {\n  for (let i = 0; i < CONSTANTS[\"num_asteroids\"]; i++){\n    const randX = Math.floor(Math.random() * CONSTANTS[\"width\"]);\n    const randY = Math.floor(Math.random() * CONSTANTS[\"height\"]);\n    this.asteroids.push(new Asteroid({pos: [randX, randY], game: this}));\n  };\n  this.ship = new Ship({pos: this.randomPosition(), game: this});\n}\n\nGame.prototype.draw = function() {\n  //draw canvas\n  // maybe add stars later? some kind of background\n  this.ctx.clearRect(0, 0, CONSTANTS[\"width\"], CONSTANTS[\"height\"]);\n  this.ctx.fillStyle = \"black\";\n  this.ctx.fillRect(0, 0, CONSTANTS[\"width\"], CONSTANTS[\"height\"]);\n  \n  //draw asteroids\n  this.asteroids.forEach(asteroid => asteroid.draw(this.ctx));\n\n  //draw ship\n  this.ship.draw(this.ctx);\n}\n\nGame.prototype.moveObjects = function(){\n  this.asteroids.forEach(asteroid => asteroid.move());\n  this.ship.move();\n}\n\nGame.prototype.wrap = function(pos){\n  if (pos[0] > CONSTANTS[\"width\"]){\n    pos[0] -= CONSTANTS[\"width\"];\n  }\n  else if (pos[0] < 0){\n    pos[0] += CONSTANTS[\"width\"];\n  };\n  \n  if (pos[1] > CONSTANTS[\"height\"]){\n    pos[1] -= CONSTANTS[\"height\"];\n  }\n  else if (pos[1] < 0){\n    pos[1] += CONSTANTS[\"height\"];\n  };\n\n  return pos;\n}\n\nGame.prototype.checkCollisions = function() {\n  for (let i = 0; i < this.asteroids.length; i++){\n    if (this.ship.isCollidedWith(this.asteroids[i])){\n      alert(\"Collision\")\n      this.asteroids[i].collideWith(this.ship);\n    }\n  }\n}\n\nGame.prototype.step = function() {\n  this.moveObjects();\n  this.checkCollisions();\n}\n\nGame.prototype.remove = function(asteroid) {\n  asteroid.radius = 0;\n}\n\nGame.prototype.delete = function(object) {\n  object.forEach(asteroid => this.asteroids.splice(this.asteroids.indexOf(asteroid), 1));\n}\n\nmodule.exports = Game; \n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(canvas) {\n  this.ctx = canvas.getContext(\"2d\");\n  this.game = new Game(this.ctx);\n}\n\nGameView.prototype.start = function(){\n  setInterval(this.game.step(), 20);\n  setInterval(this.game.draw(), 20);\n  this.bindKeyHandlers();\n  window.requestAnimationFrame(this.start.bind(this));\n}\n\nGameView.prototype.bindKeyHandlers = function(){\n  key('w', function(){ \n      this.game.ship.power([0, 1]);\n  })\n  key('a', function () {\n    this.game.ship.power([-1, 0]);\n  })\n  key('s', function () {\n    this.game.ship.power([0, -1]);\n  })\n  key('d', function () {\n    this.game.ship.power([1, 0]);\n  })\n  \n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// import MovingObject from './moving_object'; // ES6 syntax\n\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\")\nwindow.MovingObject = MovingObject;\n\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\")\nwindow.Asteroid = Asteroid;\n\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\nwindow.Game = Game;\n\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\")\nwindow.GameView = GameView;\n\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\")\nwindow.Ship = Ship;\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n  const canvas = document.getElementById(\"game-canvas\");\n  const gameView = new GameView(canvas);\n  gameView.start();\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nfunction MovingObject (options) {\n  this.pos = options[\"pos\"];\n  this.vel = options[\"vel\"];\n  this.radius = options[\"radius\"];\n  this.color = options[\"color\"];\n  this.game = options[\"game\"];\n}\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n  ctx.stroke();\n  ctx.fillStyle = this.color;\n  ctx.fill();\n}\n\nMovingObject.prototype.move = function(){\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n  this.pos = this.game.wrap(this.pos);\n}\n\nMovingObject.prototype.isCollidedWith = function(otherObject) {\n  return (Util.distance(this.pos, otherObject.pos) <= (this.radius + otherObject.radius));\n}\n\nMovingObject.prototype.collideWith = function(otherObject){\n  // this.game.remove(this);\n  // this.game.remove(otherObject);\n  \n}\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nconst DEFAULTS = {radius: 10, color: \"green\"};\n\nfunction Ship(options) {\n  options = options || {};\n  options.radius = DEFAULTS[\"radius\"];\n  options.color = DEFAULTS[\"color\"]\n  options.vel = [0,0];\n  options.pos = options[\"pos\"];\n  options.game = options[\"game\"];\n  MovingObject.call(this, options);\n}\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function() {\n  this.vel = [0,0];\n  this.pos = this.game.randomPosition();\n}\n\nShip.prototype.power = function(impulse) {\n    this.vel[0] += impulse[0];\n    this.vel[1] += impulse[1];\n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n    inherits(childClass, parentClass) {\n      function Surrogate(){};\n      Surrogate.prototype = parentClass.prototype;\n      childClass.prototype = new Surrogate();\n      childClass.prototype.constructor = childClass;\n    },\n\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n\n    distance(pos1, pos2) {\n      return Math.sqrt(((pos1[0] - pos2[0]) ** 2) + ((pos1[1] - pos2[1]) ** 2))\n    }\n    \n  };\n  \n  module.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });