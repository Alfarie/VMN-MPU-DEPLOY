import fs from 'fs';
class ConfigModel {
    constructor() {
        // public portName:string = "/dev/cu.usbmodem143301";
        this.portName = "/dev/cu.usbserial-DN02S59Z";
        this.loggerTime = 60000;
        this.interface = "en0";
        this.wifi = false;
    }
}
class ArgumentManager {
    constructor() {
        process.argv.forEach((val, {}, {}) => {
            // console.log(index + ': ' + val);
            this.extractArgv(val);
        });
    }
    extractArgv(data) {
        if (data.startsWith('-sp') || data.startsWith('--serialport')) {
            const portName = data.split('=')[1];
            Configuration.getInstance().getConfig().portName = portName;
            console.log('[Info] Port name:', portName);
        }
        else if (data.startsWith('--loggertime') || data.startsWith('-lg')) {
            const loggerTime = parseInt(data.split('=')[1]);
            Configuration.getInstance().getConfig().loggerTime = loggerTime;
            console.log('[Info] Logger time:', loggerTime);
        }
        else if (data.startsWith('--interface') || data.startsWith('-iface')) {
            const iface = data.split('=')[1];
            Configuration.getInstance().getConfig().interface = iface;
            console.log('[Info] Network interface:', iface);
        }
        else if (data.startsWith('--wifi') || data.startsWith('-wifi')) {
            Configuration.getInstance().getConfig().wifi = true;
            console.log('[Info] Wifi Permission : True');
        }
    }
}
class Configuration {
    constructor() {
        this.filePath = __dirname + "/config.txt";
        this.configModel = new ConfigModel();
        if (!this.readConfigFile()) {
            this.writeConfigFile();
        }
    }
    static getInstance() {
        if (!this.configuration) {
            this.configuration = new Configuration();
            return this.configuration;
        }
        else {
            return this.configuration;
        }
    }
    readConfigFile() {
        if (!fs.existsSync(this.filePath)) {
            console.log('[Error] Config file not found.');
            return false;
        }
        var data = JSON.parse(fs.readFileSync(this.filePath).toString());
        this.configModel.portName = data.portName;
        this.configModel.loggerTime = data.loggerTime;
        this.configModel.interface = data.interface;
        this.configModel.wifi = data.wifi;
        return true;
    }
    writeConfigFile() {
        var configJSON = {
            portName: this.configModel.portName,
            loggerTime: this.configModel.loggerTime,
            interface: this.configModel.interface,
            wifi: this.configModel.wifi
        };
        fs.writeFileSync(this.filePath, JSON.stringify(configJSON));
    }
    getConfig() {
        return this.configModel;
    }
    initArgv() {
        new ArgumentManager();
    }
}
Configuration.getInstance().initArgv();
export default Configuration.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90eXBlcy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQTtBQUVuQixNQUFNLFdBQVc7SUFBakI7UUFDSSxxREFBcUQ7UUFDOUMsYUFBUSxHQUFVLDRCQUE0QixDQUFDO1FBQy9DLGVBQVUsR0FBVSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFVLEtBQUssQ0FBQztRQUN6QixTQUFJLEdBQVcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7Q0FBQTtBQUVELE1BQU0sZUFBZTtJQUNqQjtRQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNsQyxtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTyxXQUFXLENBQUMsSUFBVztRQUMzQixJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUUxRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ25DLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7U0FDN0M7YUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoRSxNQUFNLFVBQVUsR0FBVyxRQUFRLENB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