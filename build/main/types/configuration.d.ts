declare class ConfigModel {
    portName: String;
    loggerTime: number;
    interface: String;
    wifi: Boolean;
}
declare class Configuration {
    static configuration: Configuration;
    private configModel;
    private filePath;
    static getInstance(): Configuration;
    constructor();
    private readConfigFile;
    private writeConfigFile;
    getConfig(): ConfigModel;
    initArgv(): void;
}
declare const _default: Configuration;
export default _default;
