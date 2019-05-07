export declare class AccessPoint {
    private dhcpcd_file;
    private hostapd_file;
    private wifiHookTemplate;
    startAP(SSID: string, PASS: string): void;
}
export declare class Station {
    dhcpcd_file: string;
    wifiNoHookTemplate: string;
    wpa_supplicant_dir: string;
    template: string;
    startWifi(ssid: string, password: string): void;
}
