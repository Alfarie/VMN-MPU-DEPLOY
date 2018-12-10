import { AccessPoint, Station } from './ap-station';
import Configuration from '../configuration';
import iwlist from 'wireless-tools/iwlist';
// WIFI handler
class WIFI {
    static getInstance() {
        if (this.instance == undefined) {
            this.instance = new WIFI();
        }
        return this.instance;
    }
    constructor() {
        this.accessPoint = new AccessPoint();
        this.station = new Station();
    }
    scanWifi() {
        return new Promise((resolve, reject) => {
            iwlist.scan(Configuration.getConfig().interface, (err, networks) => {
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
export default WIFI.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lmaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy93aWZpL3dpZmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDakQsT0FBTyxhQUFhLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxNQUFNLE1BQU0sdUJBQXVCLENBQUE7QUFFMUMsZUFBZTtBQUNmLE1BQU0sSUFBSTtJQUlDLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1NBQzdCO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ3hCLENBQUM7SUFDRDtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQTtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUE7SUFDaEMsQ0FBQztJQUVNLFFBQVE7UUFFWCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFCLElBQUksR0FBRyxFQUFFO29CQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDWixPQUFPO2lCQUNWO2dCQUNELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLE9BQU8sQ0FBQyxJQUFXLEVBQUUsSUFBVztRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUNNLFlBQVksQ0FBQyxJQUFXLEVBQUUsSUFBVztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDckMsQ0FBQztDQUNKO0FBRUQsZUFBZSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMifQ==