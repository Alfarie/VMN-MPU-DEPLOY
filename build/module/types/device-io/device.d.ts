export default class DeviceIO {
    lcd: any;
    hostapd_file: string;
    constructor();
    private initLcd;
    private checkWifi;
    private updateLcd;
}
