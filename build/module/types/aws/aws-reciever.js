import DeviceManager from '../device/device';
export default class AWSReciever {
    constructor(iot) {
        this.init = () => {
            console.log('[Info] AWS-IOT Ready.');
            this.awsIot.onShadowDelta.asObservable().subscribe(stateObject => {
                const state = stateObject.state;
                if (state.control) {
                    const chStr = Object.keys(state.control)[0];
                    // var ch = parseInt(chStr.replace('ch', ''));
                    // var ctrlCh = JSON.parse(JSON.stringify( mcu.GetControl()[ch - 1] ))
                    const ctrlCh = JSON.parse(JSON.stringify(DeviceManager.getDeviceData().control[0]));
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
                    DeviceManager.getTransmiter().updateControl(ctrlCh);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXJlY2lldmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2F3cy9hd3MtcmVjaWV2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxhQUFhLE1BQU0sa0JBQWtCLENBQUM7QUFFN0MsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFXO0lBRTVCLFlBQVksR0FBVztRQUtmLFNBQUksR0FBRyxHQUFHLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDN0QsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDaEMsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO29CQUNmLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1Qyw4Q0FBOEM7b0JBQzlDLHNFQUFzRTtvQkFDdEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFBO29CQUNwRixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDcEIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0NBQ2xELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBOzRCQUN2RCxDQUFDLENBQUMsQ0FBQTt5QkFDTDs2QkFDSTs0QkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDM0M7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsc0JBQXNCO29CQUN0QixhQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUVuRCxVQUFVLENBQUUsR0FBRSxFQUFFO3dCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLENBQUE7b0JBQ3BELENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQTtpQkFDVjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUMzQixvQ0FBb0M7b0JBQ3BDLDRCQUE0QjtpQkFDL0I7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQTtRQXJDRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtRQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0NBb0NKIn0=