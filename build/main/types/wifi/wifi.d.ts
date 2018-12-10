declare class WIFI {
    private accessPoint;
    private station;
    private static instance;
    static getInstance(): WIFI;
    private constructor();
    scanWifi(): Promise<{}>;
    startAp(ssid: string, pass: string): void;
    startStation(ssid: string, pass: string): void;
}
declare const _default: WIFI;
export default _default;
