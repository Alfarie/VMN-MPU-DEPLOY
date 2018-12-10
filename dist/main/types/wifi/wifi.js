"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ap_station_1 = require("./ap-station");
const configuration_1 = __importDefault(require("../configuration"));
const iwlist_1 = __importDefault(require("wireless-tools/iwlist"));
// WIFI handler
class WIFI {
    static getInstance() {
        if (this.instance == undefined) {
            this.instance = new WIFI();
        }
        return this.instance;
    }
    constructor() {
        this.accessPoint = new ap_station_1.AccessPoint();
        this.station = new ap_station_1.Station();
    }
    scanWifi() {
        return new Promise((resolve, reject) => {
            iwlist_1.default.scan(configuration_1.default.getConfig().interface, (err, networks) => {
                console.log(err, networks);
                if (err) {
                    reject(err);
                    return;
                }
                resolve(networks);
            });
        });
    }
    startAp(ssid, pass) {
        this.accessPoint.startAP(ssid, pass);
    }
    startStation(ssid, pass) {
        this.station.startWifi(ssid, pass);
    }
}
exports.default = WIFI.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lmaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy93aWZpL3dpZmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2Q0FBaUQ7QUFDakQscUVBQTZDO0FBQzdDLG1FQUEwQztBQUUxQyxlQUFlO0FBQ2YsTUFBTSxJQUFJO0lBSUMsTUFBTSxDQUFDLFdBQVc7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDeEIsQ0FBQztJQUNEO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHdCQUFXLEVBQUUsQ0FBQTtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksb0JBQU8sRUFBRSxDQUFBO0lBQ2hDLENBQUM7SUFFTSxRQUFRO1FBRVgsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxnQkFBTSxDQUFDLElBQUksQ0FBQyx1QkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFCLElBQUksR0FBRyxFQUFFO29CQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDWixPQUFPO2lCQUNWO2dCQUNELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLE9BQU8sQ0FBQyxJQUFXLEVBQUUsSUFBVztRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUNNLFlBQVksQ0FBQyxJQUFXLEVBQUUsSUFBVztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDckMsQ0FBQztDQUNKO0FBRUQsa0JBQWUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDIn0=