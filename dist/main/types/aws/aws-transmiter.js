"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("../device/device"));
class AWSTransmitter {
    constructor(iot) {
        this.awsIot = iot;
        // this.onDeviceStatus.next({topic: 'shadow', message: 'connected'})
        this.awsIot.onDeviceStatus.subscribe(data => {
            if (data.topic == 'shadow' && data.message == 'connected') {
                this.updateShadowControl();
            }
            else if (data.topic == 'device' && data.message == 'connected') {
                this.publicDeviceLogging();
                this.publicDeviceStatus();
            }
        });
    }
    publicDeviceStatus() {
        setInterval(() => this.awsIot.publish('STREAM_STATUS/' + this.awsIot.mid, device_1.default.getDeviceData().status), 2000);
    }
    publicDeviceLogging() {
        setInterval(() => this.awsIot.publish('LOG_SENSORS/' + this.awsIot.mid, device_1.default.getDeviceData().status), 60000);
    }
    updateShadowControl() {
        console.log('[Info] Update shadow control');
        const data = {
            control: {
                ch1: device_1.default.getDeviceData().control[0],
                ch2: device_1.default.getDeviceData().control[1],
                ch3: device_1.default.getDeviceData().control[2],
                ch4: device_1.default.getDeviceData().control[3],
            }
        };
        this.awsIot.updateThingShadow(data);
    }
}
exports.default = AWSTransmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXRyYW5zbWl0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvYXdzL2F3cy10cmFuc21pdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsOERBQTZDO0FBRTdDLE1BQXFCLGNBQWM7SUFFL0IsWUFBWSxHQUFVO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBRWpCLG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLEVBQUU7WUFDekMsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLFdBQVcsRUFBQztnQkFDckQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7YUFDN0I7aUJBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLFdBQVcsRUFBQztnQkFDM0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Z0JBQzFCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ08sa0JBQWtCO1FBQ3RCLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxnQkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFHLElBQUksQ0FBQyxDQUFDO0lBQzVILENBQUM7SUFDTyxtQkFBbUI7UUFDdkIsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxnQkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFILENBQUM7SUFFTSxtQkFBbUI7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sSUFBSSxHQUFHO1lBQ1QsT0FBTyxFQUFFO2dCQUNMLEdBQUcsRUFBRSxnQkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsRUFBRSxnQkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsRUFBRSxnQkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsRUFBRSxnQkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDaEQ7U0FDSixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBQ0o7QUFuQ0QsaUNBbUNDIn0=