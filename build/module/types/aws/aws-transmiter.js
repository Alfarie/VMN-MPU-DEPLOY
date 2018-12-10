import DeviceManager from '../device/device';
export default class AWSTransmitter {
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
        setInterval(() => this.awsIot.publish('STREAM_STATUS/' + this.awsIot.mid, DeviceManager.getDeviceData().status), 2000);
    }
    publicDeviceLogging() {
        setInterval(() => this.awsIot.publish('LOG_SENSORS/' + this.awsIot.mid, DeviceManager.getDeviceData().status), 60000);
    }
    updateShadowControl() {
        console.log('[Info] Update shadow control');
        const data = {
            control: {
                ch1: DeviceManager.getDeviceData().control[0],
                ch2: DeviceManager.getDeviceData().control[1],
                ch3: DeviceManager.getDeviceData().control[2],
                ch4: DeviceManager.getDeviceData().control[3],
            }
        };
        this.awsIot.updateThingShadow(data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXRyYW5zbWl0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvYXdzL2F3cy10cmFuc21pdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sYUFBYSxNQUFNLGtCQUFrQixDQUFDO0FBRTdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBYztJQUUvQixZQUFZLEdBQVU7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFFakIsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsRUFBRTtZQUN6QyxJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksV0FBVyxFQUFDO2dCQUNyRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTthQUM3QjtpQkFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksV0FBVyxFQUFDO2dCQUMzRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtnQkFDMUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUE7YUFDNUI7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTyxrQkFBa0I7UUFDdEIsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRyxJQUFJLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBQ08sbUJBQW1CO1FBQ3ZCLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFILENBQUM7SUFFTSxtQkFBbUI7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sSUFBSSxHQUFHO1lBQ1QsT0FBTyxFQUFFO2dCQUNMLEdBQUcsRUFBRSxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxFQUFFLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxHQUFHLEVBQUUsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsRUFBRSxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNoRDtTQUNKLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FDSiJ9