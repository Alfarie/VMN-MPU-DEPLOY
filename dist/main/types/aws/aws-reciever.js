"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("../device/device"));
class AWSReciever {
    constructor(iot) {
        this.awsIot = iot;
        this.init();
    }
    init() {
        console.log('[Info] AWS-IOT Ready.');
        this.awsIot.onShadowDelta.asObservable().subscribe(stateObject => {
            var state = stateObject.state;
            if (state.control) {
                var chStr = Object.keys(state.control)[0];
                // var ch = parseInt(chStr.replace('ch', ''));
                // var ctrlCh = JSON.parse(JSON.stringify( mcu.GetControl()[ch - 1] ))
                var ctrlCh = JSON.parse(JSON.stringify(device_1.default.getDeviceData().control[0]));
                var objChange = Object.keys(state.control[chStr]);
                objChange.forEach(key => {
                    if (Object.keys(state.control[chStr][key]).length > 0) {
                        Object.keys(state.control[chStr][key]).forEach(key2 => {
                            ctrlCh[key][key2] = state.control[chStr][key][key2];
                        });
                    }
                    else {
                        ctrlCh[key] = state.control[chStr][key];
                    }
                });
                // console.log(ctrlCh)
                device_1.default.getTransmiter().updateControl(ctrlCh);
                setTimeout(() => {
                    this.awsIot.awsTransmitter.updateShadowControl();
                }, 2000);
            }
            if (state.datetime) {
                console.log(state.datetime);
                // mcu.SendDateTime(state.datetime);
                // awsclient.clearDesired();
            }
        });
    }
}
exports.default = AWSReciever;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXJlY2lldmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2F3cy9hd3MtcmVjaWV2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw4REFBNkM7QUFDN0MsTUFBcUIsV0FBVztJQUU1QixZQUFZLEdBQVc7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVPLElBQUk7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzdELElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDOUIsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNmLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyw4Q0FBOEM7Z0JBQzlDLHNFQUFzRTtnQkFDdEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQTtnQkFDbEYsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3BCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUNsRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTt3QkFDdkQsQ0FBQyxDQUFDLENBQUE7cUJBQ0w7eUJBQ0k7d0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzNDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILHNCQUFzQjtnQkFDdEIsZ0JBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBRW5ELFVBQVUsQ0FBRSxHQUFFLEVBQUU7b0JBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtnQkFDcEQsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO2FBQ1Y7WUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUMzQixvQ0FBb0M7Z0JBQ3BDLDRCQUE0QjthQUMvQjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBekNELDhCQXlDQyJ9