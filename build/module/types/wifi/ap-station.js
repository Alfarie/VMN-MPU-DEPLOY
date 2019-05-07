import { execSync } from 'child_process';
import fs from 'fs';
import Configuration from '../configuration';
export class AccessPoint {
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
        if (!Configuration.getConfig().wifi) {
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
        fs.writeFileSync(this.hostapd_file, hostapdTemplate);
        console.log('[Info] Add nohook wpa_supplicant');
        fs.writeFileSync(this.dhcpcd_file, this.wifiHookTemplate);
        fs.appendFileSync(this.dhcpcd_file, "nohook wpa_supplicant");
        // console.log('[Info] Set static Ip');;
        // var stdout = execSync('sudo ifconfig wlan0 192.168.100.1 netmask 255.255.255.0');
        console.log('[Info] dhcpcd restart');
        execSync('sudo service dhcpcd restart');
        console.log('[Info] Start hostapd, dnsmasq');
        execSync('sudo systemctl start hostapd');
        execSync('sudo systemctl start dnsmasq');
        setTimeout(() => { execSync('sudo reboot'); }, 500);
    }
}
export class Station {
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
        if (!Configuration.getConfig().wifi) {
            console.log('[Info] Wifi Customization flag is not granted');
            return;
        }
        console.log('[Info] Add Wifi Data');
        fs.writeFileSync(this.wpa_supplicant_dir, this.template);
        var cmd = 'wpa_passphrase "' + ssid + '" "' + password + '"';
        var stdout = execSync(cmd).toString();
        fs.appendFileSync(this.wpa_supplicant_dir, stdout);
        console.log('[Info] Clear nohook wpa_supplicant');
        fs.writeFileSync(this.dhcpcd_file, this.wifiNoHookTemplate);
        console.log('[Info] Stop hostapd');
        execSync('sudo systemctl stop hostapd');
        execSync('sudo systemctl stop dnsmasq');
        console.log('[Info] dhcpcd restart');
        execSync('sudo service dhcpcd restart');
        setTimeout(() => { execSync('sudo reboot'); }, 500);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXAtc3RhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy93aWZpL2FwLXN0YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUE7QUFDbkIsT0FBTyxhQUFhLE1BQU0sa0JBQWtCLENBQUM7QUFFN0MsTUFBTSxPQUFPLFdBQVc7SUFBeEI7UUFDWSxnQkFBVyxHQUFXLGtCQUFrQixDQUFBO1FBQ3hDLGlCQUFZLEdBQVcsMkJBQTJCLENBQUE7UUFDbEQscUJBQWdCLEdBQVc7Ozs7Ozs7Ozs7Ozs7O0NBY3RDLENBQUE7SUEyQ0QsQ0FBQztJQXhDVSxPQUFPLENBQUMsSUFBVyxFQUFFLElBQVc7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUU7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1lBQzdELE9BQU87U0FDVjtRQUNELElBQUksZUFBZSxHQUFHOztNQUV4QixHQUFFLElBQUksR0FBRzs7Ozs7Ozs7Z0JBUUMsR0FBRSxJQUFJLEdBQUc7Ozs7Q0FJeEIsQ0FBQTtRQUNPLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hELEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMxRCxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTtRQUU1RCx3Q0FBd0M7UUFDeEMsb0ZBQW9GO1FBRXBGLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNyQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUV4QyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDN0MsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDekMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDekMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUV0RCxDQUFDO0NBRUo7QUFFRCxNQUFNLE9BQU8sT0FBTztJQUFwQjtRQUNJLGdCQUFXLEdBQVUsa0JBQWtCLENBQUE7UUFDdEMsdUJBQWtCLEdBQVU7Ozs7Ozs7Ozs7Q0FVaEMsQ0FBQTtRQUVJLHVCQUFrQixHQUFVLHlDQUF5QyxDQUFBO1FBQ3JFLGFBQVEsR0FBVTs7O0NBR3RCLENBQUE7SUF3QkQsQ0FBQztJQXRCVSxTQUFTLENBQUMsSUFBVyxFQUFFLFFBQWU7UUFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUU7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1lBQzdELE9BQU87U0FDVjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsSUFBSSxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQzdELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVuRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRTVELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN4QyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUV4QyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckMsUUFBUSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEMsVUFBVSxDQUFDLEdBQUUsRUFBRSxHQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0NBQ0oifQ==