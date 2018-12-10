"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialport_1 = require("./serialport");
const device_communication_1 = require("./device-communication");
const configuration_1 = __importDefault(require("../configuration"));
class DeviceManager {
    constructor(portName = "/dev/serial0") {
        this.serialPort = new serialport_1.SerialPortManager(portName);
        this.transmiter = new device_communication_1.TransmitionManager(this.serialPort);
        this.reciever = new device_communication_1.ReceptionManager(this.serialPort);
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        else {
            this.instance = new DeviceManager(configuration_1.default.getConfig().portName);
            return this.instance;
        }
    }
    getTransmiter() {
        return this.transmiter;
    }
    getDeviceData() {
        return this.reciever.getDeviceData();
    }
    isDeviceAvailable() {
        return this.serialPort.isAvailable();
    }
}
exports.default = DeviceManager.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2RldmljZS9kZXZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2Q0FBZ0Q7QUFDaEQsaUVBQTJGO0FBQzNGLHFFQUE2QztBQUM3QyxNQUFNLGFBQWE7SUFPZixZQUFZLFdBQW1CLGNBQWM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDhCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVDQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNuQztZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsdUJBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNyRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7U0FDdkI7SUFDTCxDQUFDO0lBRU0sYUFBYTtRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDMUIsQ0FBQztJQUNNLGFBQWE7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ3hDLENBQUM7SUFFTSxpQkFBaUI7UUFDcEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3hDLENBQUM7Q0FFSjtBQUVELGtCQUFlLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQSJ9