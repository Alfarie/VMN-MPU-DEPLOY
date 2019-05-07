"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const configuration_1 = __importDefault(require("../configuration"));
class AccessPoint {
    constructor() {
        this.dhcpcd_file = "/etc/dhcpcd.conf";
        this.hostapd_file = '/etc/hostapd/hostapd.conf';
        this.wifiHookTemplate = `hostname
clientid
persistent
option rapid_commit
option domain_name_servers, domain_name, domain_search, host_name
option classless_static_routes
option ntp_servers
option interface_mtu
require dhcp_server_identifier
slaac private
interface wlan0
static ip_address=192.168.100.1/24
static routers=192.168.100.1
static domain_name_servers=192.168.100.1 8.8.8.8 fd51:42f8:caae:d92e::1
`;
    }
    startAP(SSID, PASS) {
        if (!configuration_1.default.getConfig().wifi) {
            console.log('[Info] Wifi Customization flag is not granted');
            return;
        }
        var hostapdTemplate = `interface=wlan0
driver=nl80211
ssid=` + SSID + `
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=` + PASS + `
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
`;
        console.log('[Info] Add SSID');
        fs_1.default.writeFileSync(this.hostapd_file, hostapdTemplate);
        console.log('[Info] Add nohook wpa_supplicant');
        fs_1.default.writeFileSync(this.dhcpcd_file, this.wifiHookTemplate);
        fs_1.default.appendFileSync(this.dhcpcd_file, "nohook wpa_supplicant");
        // console.log('[Info] Set static Ip');;
        // var stdout = execSync('sudo ifconfig wlan0 192.168.100.1 netmask 255.255.255.0');
        console.log('[Info] dhcpcd restart');
        child_process_1.execSync('sudo service dhcpcd restart');
        console.log('[Info] Start hostapd, dnsmasq');
        child_process_1.execSync('sudo systemctl start hostapd');
        child_process_1.execSync('sudo systemctl start dnsmasq');
        setTimeout(() => { child_process_1.execSync('sudo reboot'); }, 500);
    }
}
exports.AccessPoint = AccessPoint;
class Station {
    constructor() {
        this.dhcpcd_file = "/etc/dhcpcd.conf";
        this.wifiNoHookTemplate = `hostname
clientid
persistent
option rapid_commit
option domain_name_servers, domain_name, domain_search, host_name
option classless_static_routes
option ntp_servers
option interface_mtu
require dhcp_server_identifier
slaac private
`;
        this.wpa_supplicant_dir = "/etc/wpa_supplicant/wpa_supplicant.conf";
        this.template = `ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=GB
`;
    }
    startWifi(ssid, password) {
        if (!configuration_1.default.getConfig().wifi) {
            console.log('[Info] Wifi Customization flag is not granted');
            return;
        }
        console.log('[Info] Add Wifi Data');
        fs_1.default.writeFileSync(this.wpa_supplicant_dir, this.template);
        var cmd = 'wpa_passphrase "' + ssid + '" "' + password + '"';
        var stdout = child_process_1.execSync(cmd).toString();
        fs_1.default.appendFileSync(this.wpa_supplicant_dir, stdout);
        console.log('[Info] Clear nohook wpa_supplicant');
        fs_1.default.writeFileSync(this.dhcpcd_file, this.wifiNoHookTemplate);
        console.log('[Info] Stop hostapd');
        child_process_1.execSync('sudo systemctl stop hostapd');
        child_process_1.execSync('sudo systemctl stop dnsmasq');
        console.log('[Info] dhcpcd restart');
        child_process_1.execSync('sudo service dhcpcd restart');
        setTimeout(() => { child_process_1.execSync('sudo reboot'); }, 500);
    }
}
exports.Station = Station;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXAtc3RhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy93aWZpL2FwLXN0YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpREFBd0M7QUFDeEMsNENBQW1CO0FBQ25CLHFFQUE2QztBQUU3QyxNQUFhLFdBQVc7SUFBeEI7UUFDWSxnQkFBVyxHQUFXLGtCQUFrQixDQUFBO1FBQ3hDLGlCQUFZLEdBQVcsMkJBQTJCLENBQUE7UUFDbEQscUJBQWdCLEdBQVc7Ozs7Ozs7Ozs7Ozs7O0NBY3RDLENBQUE7SUEyQ0QsQ0FBQztJQXhDVSxPQUFPLENBQUMsSUFBVyxFQUFFLElBQVc7UUFDbkMsSUFBSSxDQUFDLHVCQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQztZQUM3RCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLGVBQWUsR0FBRzs7TUFFeEIsR0FBRSxJQUFJLEdBQUc7Ozs7Ozs7O2dCQVFDLEdBQUUsSUFBSSxHQUFHOzs7O0NBSXhCLENBQUE7UUFDTyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0IsWUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRXJELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNoRCxZQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDMUQsWUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLHVCQUF1QixDQUFDLENBQUE7UUFFNUQsd0NBQXdDO1FBQ3hDLG9GQUFvRjtRQUVwRixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckMsd0JBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUM3Qyx3QkFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDekMsd0JBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3pDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyx3QkFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRXRELENBQUM7Q0FFSjtBQTVERCxrQ0E0REM7QUFFRCxNQUFhLE9BQU87SUFBcEI7UUFDSSxnQkFBVyxHQUFVLGtCQUFrQixDQUFBO1FBQ3RDLHVCQUFrQixHQUFVOzs7Ozs7Ozs7O0NBVWhDLENBQUE7UUFFSSx1QkFBa0IsR0FBVSx5Q0FBeUMsQ0FBQTtRQUNyRSxhQUFRLEdBQVU7OztDQUd0QixDQUFBO0lBd0JELENBQUM7SUF0QlUsU0FBUyxDQUFDLElBQVcsRUFBRSxRQUFlO1FBQ3pDLElBQUksQ0FBQyx1QkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRTtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxDQUFDLENBQUM7WUFDN0QsT0FBTztTQUNWO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BDLFlBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDN0QsSUFBSSxNQUFNLEdBQUcsd0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QyxZQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVuRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDbEQsWUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRTVELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyx3QkFBUSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEMsd0JBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNyQyx3QkFBUSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEMsVUFBVSxDQUFDLEdBQUUsRUFBRSxHQUFDLHdCQUFRLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDbEQsQ0FBQztDQUNKO0FBMUNELDBCQTBDQyJ9