export declare const control: {
    "ch": number;
    "mode": number;
    "sensor": number;
    "manual": {
        "status": number;
    };
    "timer": {
        "size": number;
        "mode": number;
        "list": number[][];
    };
    "irrigation": {
        "soil_upper": number;
        "soil_lower": number;
        "soil_detecting": number;
        "soil_working": number;
        "par_soil_setpoint": number;
        "par_detecting": number;
        "par_working": number;
        "par_acc": number;
        "mode": number;
        "limit_time": number;
        "descent_rate": number;
    };
    "dfirrigation": {
        "upper": number;
        "lower": number;
        "paracc": number;
        "working": number;
        "descent": number;
    };
    "advcond": {
        "timer_list": any[];
        "timer_size": number;
        "timer_flag": boolean;
        "sensor_condition": number;
        "sensor_setpoint": number;
        "sensor_flag": boolean;
        "sensor_direction": number;
        "sensor": number;
        "setpoint": number;
        "working": number;
        "detecting": number;
        "direction": number;
    };
    "advsb": {
        "timer_list": any[];
        "timer_size": number;
        "timer_flag": boolean;
        "sensor_condition": number;
        "sensor_setpoint": number;
        "sensor_flag": boolean;
        "sensor_direction": number;
        "sensor": number;
        "upper": number;
        "lower": number;
        "direction": number;
    };
    "advsbt": {
        "timer_list": any[];
        "timer_size": number;
        "timer_flag": boolean;
        "sensor_condition": number;
        "sensor_setpoint": number;
        "sensor_flag": boolean;
        "sensor_direction": number;
        "sensor": number;
        "upper": number;
        "lower": number;
        "working": number;
        "detecting": number;
        "direction": number;
    };
};
export declare const sensors: {
    soil: number;
    temperature: number;
    humidity: number;
    vpd: number;
    par: number;
    co2: number;
    paracc: number;
};
export declare const datetime: {
    date: string;
    time: string;
};
export declare const gpio: number[];
export declare const paracc: number[];
