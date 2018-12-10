import { SerialPortManager } from './serialport';
import { ReceptionManager, TransmitionManager } from './device-communication';
import Configuration from '../configuration';
class DeviceManager {
    constructor(portName = "/dev/serial0") {
        this.serialPort = new SerialPortManager(portName);
        this.transmiter = new TransmitionManager(this.serialPort);
        this.reciever = new ReceptionManager(this.serialPort);
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        else {
            this.instance = new DeviceManager(Configuration.getConfig().portName);
            return this.instance;
        }
    }
    getTransmiter() {
        return this.transmiter;
    }
    getDeviceData() {
        return this.reciever.getDeviceData();
    }
    isDeviceAvailable() {
        return this.serialPort.isAvailable();
    }
}
export default DeviceManager.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2RldmljZS9kZXZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBZ0IsTUFBTSx3QkFBd0IsQ0FBQTtBQUMzRixPQUFPLGFBQWEsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxNQUFNLGFBQWE7SUFPZixZQUFZLFdBQW1CLGNBQWM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNuQztZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3JFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtTQUN2QjtJQUNMLENBQUM7SUFFTSxhQUFhO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUMxQixDQUFDO0lBQ00sYUFBYTtRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDeEMsQ0FBQztJQUVNLGlCQUFpQjtRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDeEMsQ0FBQztDQUVKO0FBRUQsZUFBZSxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUEifQ==