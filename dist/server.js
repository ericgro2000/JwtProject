/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/authController.ts":
/*!*******************************!*\
  !*** ./src/authController.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass AuthController {\n    registration(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                // Handle registration logic\n            }\n            catch (e) {\n                console.error('Error in registration method:', e);\n            }\n        });\n    }\n    login(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                // Handle login logic\n            }\n            catch (e) {\n                console.error('Error in login method:', e);\n            }\n        });\n    }\n    getUsers(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                console.log('getUsers method called');\n                res.json({ message: 'Server is working' });\n            }\n            catch (e) {\n                console.error('Error in getUsers method:', e);\n                res.status(500).json({ error: 'Internal server error' });\n            }\n        });\n    }\n}\nexports[\"default\"] = new AuthController();\n\n\n//# sourceURL=webpack://jwtproject/./src/authController.ts?");

/***/ }),

/***/ "./src/authRouter.ts":
/*!***************************!*\
  !*** ./src/authRouter.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst authController_1 = __importDefault(__webpack_require__(/*! ./authController */ \"./src/authController.ts\"));\nconst router = express_1.default.Router();\nrouter.post('/registration', authController_1.default.registration);\nrouter.post('/login', authController_1.default.login);\nrouter.get('/users', authController_1.default.getUsers);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://jwtproject/./src/authRouter.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst authRouter_1 = __importDefault(__webpack_require__(/*! ./authRouter */ \"./src/authRouter.ts\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst port = process.env.PORT || 3000;\nconst app = (0, express_1.default)();\napp.use(express_1.default.json());\napp.use((0, cors_1.default)());\napp.use(\"/auth\", authRouter_1.default);\nconst start = () => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        //await mongoose.connect(`mongodb+srv://mongoMe:0123456789@cluster0.acbnjaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)\n        app.listen(port, () => console.log(`server started on port ${port}`));\n    }\n    catch (e) {\n        console.log(e);\n    }\n});\nstart();\n\n\n//# sourceURL=webpack://jwtproject/./src/index.ts?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;