"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
class DeviceIO {
    constructor() {
        this.hostapd_file = '/etc/hostapd/hostapd.conf';
        if (os_1.default.arch() == 'arm') {
            this.initLcd();
        }
        else {
            console.log('[Error] LCD is not support for ' + os_1.default.arch());
            this.lcd = null;
        }
    }
    async initLcd() {
        const LCD = require('lcdi2c');
        this.lcd = new LCD(1, 0x27, 20, 4);
        this.lcd.clear();
        this.lcd.on();
        this.lcd.println("VMN Network", 1);
        this.lcd.println("Initializing..", 2);
        process.on('exit', function () {
            this.lcd.clear();
            this.lcd.off();
        });
        setTimeout(() => {
            this.lcd.clear();
            this.lcd.println("Initialized!", 2);
            this.updateLcd();
        }, 3000);
    }
    checkWifi() {
        const lastOctave = parseInt(os_1.default.networkInterfaces()['wlan0'][0]['address'].split('.')[3]);
        if (lastOctave > 1) {
            return 'STA:' + os_1.default.networkInterfaces()['wlan0'][0]['address'];
        }
        const apName = fs_1.default.readFileSync(this.hostapd_file).toString().split('\n')[2].replace('ssid=', '');
        return 'AP:' + apName;
    }
    updateLcd() {
        setInterval(() => {
            // update redux
            // WiFi: AP 
            this.lcd.println(this.checkWifi(), 1);
            this.lcd.println(". . . . . . . .", 2);
        }, 1000);
    }
}
exports.default = DeviceIO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2RldmljZS1pby9kZXZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsNENBQW1CO0FBQ25CLE1BQXFCLFFBQVE7SUFHekI7UUFEQSxpQkFBWSxHQUFXLDJCQUEyQixDQUFBO1FBRTlDLElBQUksWUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7YUFDSTtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEdBQUcsWUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDMUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRU8sS0FBSyxDQUFDLE9BQU87UUFDakIsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXRDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU8sU0FBUztRQUNiLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxZQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4RixJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUM7WUFBRSxPQUFPLE1BQU0sR0FBRyxZQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUFFO1FBQ3BGLE1BQU0sTUFBTSxHQUFHLFlBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQy9GLE9BQU8sS0FBSyxHQUFHLE1BQU0sQ0FBQTtJQUN6QixDQUFDO0lBQ08sU0FBUztRQUNiLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDYixlQUFlO1lBQ2YsWUFBWTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0NBQ0o7QUE5Q0QsMkJBOENDIn0=