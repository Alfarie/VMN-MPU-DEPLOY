import { TransmitionManager, DeviceDataSG } from './device-communication';
declare class DeviceManager {
    private static instance;
    private serialPort;
    private transmiter;
    private reciever;
    constructor(portName?: string);
    static getInstance(): DeviceManager;
    getTransmiter(): TransmitionManager;
    getDeviceData(): DeviceDataSG;
    isDeviceAvailable(): boolean;
}
declare const _default: DeviceManager;
export default _default;
