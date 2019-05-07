export declare class SerialPortManager {
    private port;
    private parser;
    private reciever;
    private portName;
    private isPortAvailable;
    constructor(port: string);
    getTransmiter(): any;
    getReciever(): any;
    isAvailable(): boolean;
    private onData;
    private onOpen;
    private onOpened;
    private onClosed;
}
