"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class ConfigModel {
    constructor() {
        // public portName:String = "/dev/cu.usbmodem143301";
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
        if (!fs_1.default.existsSync(this.filePath)) {
            console.log('[Error] Config file not found.');
            return false;
        }
        var data = JSON.parse(fs_1.default.readFileSync(this.filePath).toString());
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
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(configJSON));
    }
    getConfig() {
        return this.configModel;
    }
    initArgv() {
        new ArgumentManager();
    }
}
Configuration.getInstance().initArgv();
exports.default = Configuration.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90eXBlcy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQW1CO0FBRW5CLE1BQU0sV0FBVztJQUFqQjtRQUNJLHFEQUFxRDtRQUM5QyxhQUFRLEdBQVUsNEJBQTRCLENBQUM7UUFDL0MsZUFBVSxHQUFVLEtBQUssQ0FBQztRQUMxQixjQUFTLEdBQVUsS0FBSyxDQUFDO1FBQ3pCLFNBQUksR0FBVyxLQUFLLENBQUM7SUFDaEMsQ0FBQztDQUFBO0FBRUQsTUFBTSxlQUFlO0lBQ2pCO1FBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2xDLG1DQUFtQztZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNPLFdBQVcsQ0FBQyxJQUFXO1FBQzNCLElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBRTFELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbkMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7WUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtTQUM3QzthQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hFLE1BQU0sVUFBVSxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMs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