import { Router } from './router';
import express from 'express';
import WIFI from '../../wifi/wifi';
export default class ControlRouter extends Router {
    constructor() {
        super();
        this.name = '/wifi';
        this.router = express.Router();
        this.mountRoute();
    }
    mountRoute() {
        this.router.get('/scan', function ({}, res) {
            WIFI.scanWifi()
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
            WIFI.startAp(ssid, password);
        });
        // /wifi/stamode
        this.router.post('/stamode', function (req, res) {
            const { ssid, password } = req.body;
            res.json({ msg: 'success' });
            // { ssid: 'SmartGrobot-A', password: 'raspberry' }
            WIFI.startStation(ssid, password);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lmaVJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy9yb3V0ZXIvd2lmaVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLElBQUksTUFBTSxpQkFBaUIsQ0FBQztBQUNuQyxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxNQUFNO0lBQzdDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUNPLFVBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztZQUN0QyxJQUFJLENBQUMsUUFBUSxFQUFFO2lCQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDVCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQSxFQUFFO2dCQUNSLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxlQUFlO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDMUMsTUFBTSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3JCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtZQUM1QixtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDM0MsTUFBTSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtZQUM1QixtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oifQ==