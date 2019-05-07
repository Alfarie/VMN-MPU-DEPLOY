"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webservice_1 = require("./types/ws/webservice");
const vmn_socket_1 = require("./types/ws/socket/vmn-socket");
const ws = new webservice_1.WebService();
new vmn_socket_1.VmnSocket(ws.getIO());
const aws_1 = __importDefault(require("./types/aws/aws"));
new aws_1.default();
const device_1 = __importDefault(require("./types/device-io/device"));
new device_1.default();
// import { InitVmnLogger } from './types/simulation/generate-sensors-logger'
// InitVmnLogger()พีื
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxzREFBbUQ7QUFDbkQsNkRBQXlEO0FBRXpELE1BQU0sRUFBRSxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO0FBQzVCLElBQUksc0JBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUMxQiwwREFBeUM7QUFDekMsSUFBSSxhQUFVLEVBQUUsQ0FBQztBQUVqQixzRUFBK0M7QUFDL0MsSUFBSSxnQkFBUSxFQUFFLENBQUM7QUFFZiw2RUFBNkU7QUFFN0UscUJBQXFCIn0=