import { TransmitionManager, DeviceDataSG } from './device-communication';
declare class DeviceManager {
    static instance: DeviceManager;
    private serialPort;
    private transmiter;
    private reciever;
    constructor(portName?: String);
    static getInstance(): DeviceManager;
    getTransmiter(): TransmitionManager;
    getDeviceData(): DeviceDataSG;
    isDeviceAvailable(): Boolean;
}
declare const _default: DeviceManager;
export default _default;
