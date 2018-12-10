import { Router } from './router';
import express from 'express';
import DeviceManager from '../../device/device';
export default class SettingRouter extends Router {
    constructor() {
        super();
        this.name = '/setting';
        this.router = express.Router();
        this.mountRoute();
    }
    mountRoute() {
        this.router.post('/datetime', function (req, res) {
            // {date: "2017-01-01", time: "10:46"}
            DeviceManager.getTransmiter().updateDateTime(req.body);
            console.log(req.body);
            res.json({
                msg: 'success'
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ1JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy9yb3V0ZXIvc2V0dGluZ1JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxNQUFNO0lBQzdDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQTtRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUNPLFVBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUM1QyxzQ0FBc0M7WUFDdEMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDTCxHQUFHLEVBQUUsU0FBUzthQUNqQixDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7Q0FDSiJ9