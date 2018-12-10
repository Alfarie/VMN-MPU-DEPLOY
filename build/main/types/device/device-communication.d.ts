import { SerialPortManager } from './serialport';
export declare abstract class DeviceData {
    protected status: any;
    protected control: any;
    protected setting: any;
}
export declare class DeviceDataSG extends DeviceData {
    status: {
        sensors: any;
        datetime: any;
        paracc: any;
        gpio: any;
    };
    control: any;
    constructor();
}
export declare class ReceptionManager {
    private serialPort;
    private extractStatus;
    private extractControl;
    private deviceDataSG;
    constructor(serial: SerialPortManager);
    getDeviceData(): DeviceDataSG;
    private onRecieved;
    private verifyData;
    private splitData;
    private replaceAll;
}
export declare class TransmitionManager {
    private serialPort;
    private cmdList;
    private isTunnelAvailable;
    private craftCommand;
    constructor(serial: SerialPortManager);
    updateDateTime(datetime: any): void;
    updateControl(control: any): void;
    private write;
    private onRecieved;
    private writeRoutine;
    private requestRoutine;
    private requestControl;
}
