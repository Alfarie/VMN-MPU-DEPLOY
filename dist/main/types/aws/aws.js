"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_iot_1 = __importDefault(require("./aws-iot"));
class AWSManager {
    constructor() {
        this.init();
    }
    async init() {
        this.awsIot = new aws_iot_1.default();
    }
}
exports.default = AWSManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2F3cy9hd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBOEI7QUFFOUIsTUFBcUIsVUFBVTtJQUczQjtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNmLENBQUM7SUFFTyxLQUFLLENBQUMsSUFBSTtRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBTSxFQUFFLENBQUE7SUFDOUIsQ0FBQztDQUNKO0FBVkQsNkJBVUMifQ==