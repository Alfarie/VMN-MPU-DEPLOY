import moment from 'moment';
import DeviceManager from '../../device/device';
export class SocketHandler {
    constructor(IO) {
        this.io = IO;
        this.declarePublisher();
        this.publishStatus();
    }
    declarePublisher() {
        this.io.on('connection', function (socket) {
            console.log("[socket] Client Connected");
            socket.join('0x01');
            socket.on('disconnect', function () {
                console.log('[socket] DISCONNECT');
            });
        });
    }
    publishStatus() {
        setInterval(() => {
            if (!DeviceManager.isDeviceAvailable()) {
                return;
            }
            try {
                var deviceStatus = DeviceManager.getDeviceData().status;
                const data = {
                    sensors: deviceStatus.sensors,
                    datetime: moment(deviceStatus.datetime.date + ' ' + deviceStatus.datetime.time).format('YYYY-MM-DD HH:mm:ss'),
                    paracc: deviceStatus.paracc,
                    gpio: deviceStatus.gpio
                };
                // console.log(data);
                this.io.to('0x01').emit('DEVICE_DATA', data);
            }
            catch (err) {
                console.log(err);
            }
        }, 1000);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3R5cGVzL3dzL3NvY2tldC9zb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBQzNCLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFBO0FBQy9DLE1BQU0sT0FBTyxhQUFhO0lBRXRCLFlBQVksRUFBTTtRQUNkLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxnQkFBZ0I7UUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsTUFBTTtZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsYUFBYTtRQUNuQixXQUFXLENBQUUsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFDO2dCQUNuQyxPQUFRO2FBQ1g7WUFDRCxJQUFJO2dCQUNBLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUE7Z0JBQ3ZELE1BQU0sSUFBSSxHQUFJO29CQUNWLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTztvQkFDN0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7b0JBQzlHLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTTtvQkFDM0IsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO2lCQUMxQixDQUFBO2dCQUNELHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNoRDtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDbEI7UUFDTCxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFFWCxDQUFDO0NBQ0oifQ==