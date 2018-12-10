import DeviceManager from '../device/device';
import store from '../store';
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
        // console.log(store.getState().nodes);
        setInterval(() => this.awsIot.publish('STREAM_STATUS_VMN/' + this.awsIot.mid, store.getState().nodes), 2000);
    }
    publicDeviceLogging() {
        setInterval(() => this.awsIot.publish('LOG_SENSORS_VMN/' + this.awsIot.mid, store.getState().nodes), 60000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXRyYW5zbWl0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvYXdzL2F3cy10cmFuc21pdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sYUFBYSxNQUFNLGtCQUFrQixDQUFDO0FBQzdDLE9BQU8sS0FBSyxNQUFNLFVBQVUsQ0FBQTtBQUM1QixNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWM7SUFFL0IsWUFBWSxHQUFVO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBRWpCLG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLEVBQUU7WUFDekMsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLFdBQVcsRUFBQztnQkFDckQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7YUFDN0I7aUJBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLFdBQVcsRUFBQztnQkFDM0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Z0JBQzFCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU8sa0JBQWtCO1FBQ3RCLHVDQUF1QztRQUN2QyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBRSxFQUFHLElBQUksQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFDTyxtQkFBbUI7UUFDdkIsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRU0sbUJBQW1CO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM1QyxNQUFNLElBQUksR0FBRztZQUNULE9BQU8sRUFBRTtnQkFDTCxHQUFHLEVBQUUsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsRUFBRSxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxFQUFFLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxHQUFHLEVBQUUsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDaEQ7U0FDSixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBQ0oifQ==