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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Role_1 = __importDefault(__webpack_require__(/*! ./models/Role */ \"./src/models/Role.ts\"));\nconst bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ \"bcrypt\"));\nconst User_1 = __importDefault(__webpack_require__(/*! ./models/User */ \"./src/models/User.ts\"));\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/config.ts\");\nconst generateAccessToken = (id, roles) => {\n    const payload = {\n        id,\n        roles,\n    };\n    return jsonwebtoken_1.default.sign(payload, config_1.config.secret, { expiresIn: \"24h\" });\n};\nclass AuthController {\n    registration(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const errors = (0, express_validator_1.validationResult)(req);\n                if (!errors.isEmpty()) {\n                    return res\n                        .status(400)\n                        .json({ message: \"Ошибка при регистрации\", errors });\n                }\n                const { username, password } = req.body;\n                const candidate = yield User_1.default.findOne({ username });\n                if (candidate) {\n                    return res\n                        .status(400)\n                        .json({ message: \"Пользователь с таким именем уже существует\" });\n                }\n                const hashPassword = bcrypt_1.default.hashSync(password, 7);\n                const userRole = yield Role_1.default.findOne({ value: \"USER\" });\n                const user = new User_1.default({\n                    username,\n                    password: hashPassword,\n                    roles: userRole ? [userRole.value] : [\"USER\"],\n                });\n                yield user.save();\n                return res.json({ message: \"Пользователь успешно зарегистрирован\" });\n            }\n            catch (e) {\n                console.log(e);\n                return res.status(400).json({ message: \"Registration error\" });\n            }\n        });\n    }\n    login(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const { username, password } = req.body;\n                const user = yield User_1.default.findOne({ username });\n                if (!user) {\n                    return res\n                        .status(400)\n                        .json({ message: `Пользователь ${username} не найден` });\n                }\n                const validPassword = bcrypt_1.default.compareSync(password, user.password);\n                if (!validPassword) {\n                    return res.status(400).json({ message: `Введен неверный пароль` });\n                }\n                const token = generateAccessToken(user._id, user.roles);\n                return res.json({ token });\n            }\n            catch (e) {\n                console.log(e);\n                return res.status(400).json({ message: \"Login error\" });\n            }\n        });\n    }\n    getUsers(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const users = yield User_1.default.find();\n                console.log(\"getUsers method called\");\n                return res.json({ users });\n            }\n            catch (e) {\n                console.error(\"Error in getUsers method:\", e);\n                return res.status(500).json({ error: \"Internal server error\" });\n            }\n        });\n    }\n}\nexports[\"default\"] = new AuthController();\n\n\n//# sourceURL=webpack://jwtproject/./src/authController.ts?");

/***/ }),

/***/ "./src/authRouter.ts":
/*!***************************!*\
  !*** ./src/authRouter.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst authController_1 = __importDefault(__webpack_require__(/*! ./authController */ \"./src/authController.ts\"));\nconst router = express_1.default.Router();\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst roleMiddleware_1 = __importDefault(__webpack_require__(/*! ./middleware/roleMiddleware */ \"./src/middleware/roleMiddleware.ts\"));\nrouter.post(\"/registration\", [\n    (0, express_validator_1.check)(\"username\", \"Имя пользователя не может быть пустым\").notEmpty(),\n    (0, express_validator_1.check)(\"password\", \"Пароль должен быть больше 4 и меньше 10 символов\").isLength({ min: 4, max: 10 }),\n], authController_1.default.registration);\nrouter.post(\"/login\", authController_1.default.login);\nrouter.get(\"/users\", (0, roleMiddleware_1.default)([\"ADMIN\"]), authController_1.default.getUsers);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://jwtproject/./src/authRouter.ts?");

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.config = void 0;\nexports.config = {\n    secret: \"SECRET_KEY_RANDOM\",\n};\n\n\n//# sourceURL=webpack://jwtproject/./src/config.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst authRouter_1 = __importDefault(__webpack_require__(/*! ./authRouter */ \"./src/authRouter.ts\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst port = process.env.PORT || 3000;\nconst app = (0, express_1.default)();\napp.use(express_1.default.json());\napp.use((0, cors_1.default)());\napp.use(\"/auth\", authRouter_1.default);\nconst start = () => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        yield mongoose_1.default.connect(`mongodb+srv://meMDb3:0123456789@cluster3.j4ik5g5.mongodb.net/`);\n        app.listen(port, () => console.log(`server started on port ${port}`));\n    }\n    catch (e) {\n        console.log(e);\n    }\n});\nstart();\n\n\n//# sourceURL=webpack://jwtproject/./src/index.ts?");

/***/ }),

/***/ "./src/middleware/roleMiddleware.ts":
/*!******************************************!*\
  !*** ./src/middleware/roleMiddleware.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = roleMiddleware;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nfunction roleMiddleware(roles) {\n    return (req, res, next) => {\n        var _a;\n        if (req.method === \"OPTIONS\") {\n            next();\n        }\n        try {\n            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(\" \")[1];\n            if (!token) {\n                return res.status(403).json({ message: \"Пользователь не авторизован\" });\n            }\n            const { roles: userRoles } = jsonwebtoken_1.default.verify(token, config_1.config.secret);\n            const hasRole = userRoles.some((role) => roles.includes(role));\n            if (!hasRole) {\n                return res.status(403).json({ message: \"У вас нет доступа\" });\n            }\n            next();\n        }\n        catch (e) {\n            console.log(e);\n            return res.status(403).json({ message: \"Пользователь не авторизован\" });\n        }\n    };\n}\n\n\n//# sourceURL=webpack://jwtproject/./src/middleware/roleMiddleware.ts?");

/***/ }),

/***/ "./src/models/Role.ts":
/*!****************************!*\
  !*** ./src/models/Role.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst RoleSchema = new mongoose_1.Schema({\n    value: { type: String, unique: true, default: \"USER\" },\n});\nconst Role = (0, mongoose_1.model)(\"Role\", RoleSchema);\nexports[\"default\"] = Role;\n\n\n//# sourceURL=webpack://jwtproject/./src/models/Role.ts?");

/***/ }),

/***/ "./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst UserSchema = new mongoose_1.Schema({\n    username: { type: String, unique: true, required: true },\n    password: { type: String, required: true },\n    roles: [{ type: String, ref: \"Role\" }],\n});\nconst User = (0, mongoose_1.model)(\"User\", UserSchema);\nexports[\"default\"] = User;\n\n\n//# sourceURL=webpack://jwtproject/./src/models/User.ts?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

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

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("express-validator");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

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