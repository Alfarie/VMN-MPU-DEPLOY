"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const express_1 = __importDefault(require("express"));
const device_1 = __importDefault(require("../../device/device"));
class SettingRouter extends router_1.Router {
    constructor() {
        super();
        this.name = '/setting';
        this.router = express_1.default.Router();
        this.mountRoute();
    }
    mountRoute() {
        this.router.post('/datetime', function (req, res) {
            // {date: "2017-01-01", time: "10:46"}
            device_1.default.getTransmiter().updateDateTime(req.body);
            console.log(req.body);
            res.json({
                msg: 'success'
            });
        });
    }
}
exports.default = SettingRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ1JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy9yb3V0ZXIvc2V0dGluZ1JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFrQztBQUNsQyxzREFBOEI7QUFDOUIsaUVBQWdEO0FBQ2hELE1BQXFCLGFBQWMsU0FBUSxlQUFNO0lBQzdDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQTtRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFDTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDNUMsc0NBQXNDO1lBQ3RDLGdCQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLEdBQUcsRUFBRSxTQUFTO2FBQ2pCLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztDQUNKO0FBbEJELGdDQWtCQyJ9