"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("../device/device"));
const store_1 = __importDefault(require("../store"));
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
        // console.log(store.getState().nodes);
        setInterval(() => this.awsIot.publish('STREAM_STATUS_VMN/' + this.awsIot.mid, store_1.default.getState().nodes), 2000);
    }
    publicDeviceLogging() {
        setInterval(() => this.awsIot.publish('LOG_SENSORS_VMN/' + this.awsIot.mid, store_1.default.getState().nodes), 60000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXRyYW5zbWl0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvYXdzL2F3cy10cmFuc21pdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsOERBQTZDO0FBQzdDLHFEQUE0QjtBQUM1QixNQUFxQixjQUFjO0lBRS9CLFlBQVksR0FBVTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtRQUVqQixvRUFBb0U7UUFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3pDLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxXQUFXLEVBQUM7Z0JBQ3JELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO2FBQzdCO2lCQUNJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxXQUFXLEVBQUM7Z0JBQzNELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO2dCQUMxQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTthQUM1QjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVPLGtCQUFrQjtRQUN0Qix1Q0FBdUM7UUFDdkMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGVBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUUsRUFBRyxJQUFJLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBQ08sbUJBQW1CO1FBQ3ZCLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxlQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakgsQ0FBQztJQUVNLG1CQUFtQjtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLEdBQUc7WUFDVCxPQUFPLEVBQUU7Z0JBQ0wsR0FBRyxFQUFFLGdCQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxFQUFFLGdCQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxFQUFFLGdCQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxFQUFFLGdCQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNoRDtTQUNKLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FDSjtBQXJDRCxpQ0FxQ0MifQ==