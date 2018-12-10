"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const express_1 = __importDefault(require("express"));
const wifi_1 = __importDefault(require("../../wifi/wifi"));
class ControlRouter extends router_1.Router {
    constructor() {
        super();
        this.name = '/wifi';
        this.router = express_1.default.Router();
        this.mountRoute();
    }
    mountRoute() {
        this.router.get('/scan', function ({}, res) {
            wifi_1.default.scanWifi()
                .then(data => {
                res.json({ msg: 'success', data: data });
            })
                .catch(err => {
                res.json({ msg: 'failure', data: err });
            });
        });
        // /wifi/apmode
        this.router.post('/apmode', function (req, res) {
            const { ssid, password } = req.body;
            console.log(req.body);
            res.json({ msg: 'success' });
            // { ssid: 'SmartGrobot-A', password: 'raspberry' }
            wifi_1.default.startAp(ssid, password);
        });
        // /wifi/stamode
        this.router.post('/stamode', function (req, res) {
            const { ssid, password } = req.body;
            res.json({ msg: 'success' });
            // { ssid: 'SmartGrobot-A', password: 'raspberry' }
            wifi_1.default.startStation(ssid, password);
        });
    }
}
exports.default = ControlRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lmaVJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy9yb3V0ZXIvd2lmaVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFrQztBQUNsQyxzREFBOEI7QUFDOUIsMkRBQW1DO0FBQ25DLE1BQXFCLGFBQWMsU0FBUSxlQUFNO0lBQzdDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFDTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7WUFDdEMsY0FBSSxDQUFDLFFBQVEsRUFBRTtpQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ1QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxHQUFHLENBQUEsRUFBRTtnQkFDUixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQzFDLE1BQU0sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7WUFDNUIsbURBQW1EO1lBQ25ELGNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQzNDLE1BQU0sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7WUFDNUIsbURBQW1EO1lBQ25ELGNBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBbkNELGdDQW1DQyJ9