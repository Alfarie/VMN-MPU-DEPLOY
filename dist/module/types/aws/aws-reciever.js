import DeviceManager from '../device/device';
export default class AWSReciever {
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
                var ctrlCh = JSON.parse(JSON.stringify(DeviceManager.getDeviceData().control[0]));
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXJlY2lldmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2F3cy9hd3MtcmVjaWV2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxhQUFhLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFXO0lBRTVCLFlBQVksR0FBVztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtRQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRU8sSUFBSTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDN0QsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUM5QixJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLDhDQUE4QztnQkFDOUMsc0VBQXNFO2dCQUN0RSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUE7Z0JBQ2xGLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNwQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDbEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7d0JBQ3ZELENBQUMsQ0FBQyxDQUFBO3FCQUNMO3lCQUNJO3dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMzQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxzQkFBc0I7Z0JBQ3RCLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBRW5ELFVBQVUsQ0FBRSxHQUFFLEVBQUU7b0JBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtnQkFDcEQsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO2FBQ1Y7WUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUMzQixvQ0FBb0M7Z0JBQ3BDLDRCQUE0QjthQUMvQjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKIn0=