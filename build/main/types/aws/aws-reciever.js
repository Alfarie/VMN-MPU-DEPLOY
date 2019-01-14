"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("../device/device"));
class AWSReciever {
    constructor(iot) {
        this.init = () => {
            console.log('[Info] AWS-IOT Ready.');
            this.awsIot.onShadowDelta.asObservable().subscribe(stateObject => {
                const state = stateObject.state;
                if (state.control) {
                    const chStr = Object.keys(state.control)[0];
                    // var ch = parseInt(chStr.replace('ch', ''));
                    // var ctrlCh = JSON.parse(JSON.stringify( mcu.GetControl()[ch - 1] ))
                    const ctrlCh = JSON.parse(JSON.stringify(device_1.default.getDeviceData().control[0]));
                    const objChange = Object.keys(state.control[chStr]);
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
        };
        this.awsIot = iot;
        this.init();
    }
}
exports.default = AWSReciever;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXJlY2lldmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2F3cy9hd3MtcmVjaWV2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw4REFBNkM7QUFFN0MsTUFBcUIsV0FBVztJQUU1QixZQUFZLEdBQVc7UUFLZixTQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzdELE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7Z0JBQ2hDLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtvQkFDZixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsOENBQThDO29CQUM5QyxzRUFBc0U7b0JBQ3RFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUE7b0JBQ3BGLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNwQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQ0FDbEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7NEJBQ3ZELENBQUMsQ0FBQyxDQUFBO3lCQUNMOzZCQUNJOzRCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUMzQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDSCxzQkFBc0I7b0JBQ3RCLGdCQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUVuRCxVQUFVLENBQUUsR0FBRSxFQUFFO3dCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLENBQUE7b0JBQ3BELENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQTtpQkFDVjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUMzQixvQ0FBb0M7b0JBQ3BDLDRCQUE0QjtpQkFDL0I7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQTtRQXJDRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtRQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0NBb0NKO0FBekNELDhCQXlDQyJ9