"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_act_1 = require("redux-act");
const moment_1 = __importDefault(require("moment"));
exports.setNodes = redux_act_1.createAction('SET_NODES');
const initState = {
    supply: 2.0,
    nodes: [
        { ec: 1.2, volume: 300 },
        { ec: 1.2, volume: 300 },
        { ec: 1.2, volume: 300 },
        { ec: 1.2, volume: 300 },
        { ec: 1.2, volume: 300 },
        { ec: 1.2, volume: 300 },
        { ec: 1.2, volume: 300 },
        { ec: 1.2, volume: 300 },
        { ec: 1.2, volume: 300 }
    ],
    datetime: moment_1.default().format('YYYY-MM-DD HH:mm:ss')
};
exports.default = redux_act_1.createReducer({
    [exports.setNodes]: (state, nodes) => (Object.assign({}, state, nodes))
}, initState);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvc3RvcmUvbm9kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBcUQ7QUFDckQsb0RBQTJCO0FBRWQsUUFBQSxRQUFRLEdBQU8sd0JBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUV0RCxNQUFNLFNBQVMsR0FBRztJQUNkLE1BQU0sRUFBRSxHQUFHO0lBQ1gsS0FBSyxFQUFFO1FBQ0gsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7UUFDdkIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7UUFDdkIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7UUFDdkIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7UUFDdkIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7UUFDdkIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7UUFDdkIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7UUFDdkIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7UUFDdkIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7S0FDMUI7SUFDRCxRQUFRLEVBQUUsZ0JBQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztDQUNuRCxDQUFBO0FBRUQsa0JBQWUseUJBQWEsQ0FBQztJQUN6QixDQUFDLGdCQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLG1CQUFNLEtBQUssRUFBSyxLQUFLLEVBQUU7Q0FDeEQsRUFBRSxTQUFTLENBQUMsQ0FBQSJ9