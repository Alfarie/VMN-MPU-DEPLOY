"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const operation_1 = __importDefault(require("./operation"));
const nodes_1 = __importDefault(require("./nodes"));
const preset_1 = __importDefault(require("./preset"));
const middlewares = [redux_thunk_1.default];
const reducers = redux_1.combineReducers({
    operation: operation_1.default, nodes: nodes_1.default, preset: preset_1.default
});
exports.default = redux_1.createStore(reducers, redux_1.applyMiddleware(...middlewares));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvc3RvcmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBb0U7QUFDcEUsOERBQStCO0FBQy9CLDREQUFtQztBQUNuQyxvREFBMkI7QUFDM0Isc0RBQTZCO0FBQzdCLE1BQU0sV0FBVyxHQUFHLENBQUMscUJBQUssQ0FBQyxDQUFBO0FBRTNCLE1BQU0sUUFBUSxHQUFHLHVCQUFlLENBQUM7SUFDN0IsU0FBUyxFQUFULG1CQUFTLEVBQUMsS0FBSyxFQUFMLGVBQUssRUFBQyxNQUFNLEVBQU4sZ0JBQU07Q0FDekIsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsbUJBQVcsQ0FBQyxRQUFRLEVBQUMsdUJBQWUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUEifQ==