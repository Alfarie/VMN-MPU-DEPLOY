export declare class SerialPortManager {
    private port;
    private parser;
    private reciever;
    private portName;
    private isPortAvailable;
    constructor(port: String);
    getTransmiter(): any;
    getReciever(): any;
    isAvailable(): Boolean;
    private onData;
    private onOpen;
    private onOpened;
    private onClosed;
}
