"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model = __importStar(require("./device-model"));
const moment_1 = __importDefault(require("moment"));
const store_1 = __importDefault(require("../store"));
const nodes_1 = require("../store/nodes");
class StringManager {
    static replaceAll(str, search, replacement) {
        var target = str;
        return target.replace(new RegExp(search, 'g'), replacement);
    }
}
class DeviceData {
}
exports.DeviceData = DeviceData;
class DeviceDataSG extends DeviceData {
    constructor() {
        super();
        this.status = {
            sensors: JSON.parse(JSON.stringify(Model.sensors)),
            datetime: { date: moment_1.default().format('YYYY-MM-DD'), time: moment_1.default().format('HH:mm:ss') },
            paracc: [0, 0, 0, 0],
            gpio: [0, 0, 0, 0]
        };
        this.control = [JSON.parse(JSON.stringify(Model.control)),
            JSON.parse(JSON.stringify(Model.control)),
            JSON.parse(JSON.stringify(Model.control)),
            JSON.parse(JSON.stringify(Model.control))];
    }
}
exports.DeviceDataSG = DeviceDataSG;
class ExtractJSON {
}
class ExtractControl extends ExtractJSON {
    extract(array) {
        var craftedJson = {};
        const header = array[0];
        const ch = parseInt(array[1]);
        array.splice(0, 1);
        if (header == 'ct-chst') {
            craftedJson = { ch: 0, mode: 0, sensor: 0, status: 0 };
            Object.keys(craftedJson).forEach((key, ind) => {
                craftedJson[key] = parseInt(array[ind]);
            });
            console.log('[Info] Recieved: channel-mode-sensor from channel ' + craftedJson.ch);
        }
        else if (header == 'ct-timer') {
            craftedJson = { mode: parseInt(array[1]), list: {} };
            // [[300-480]-[540-720]-[780-960]-[1020-1200]-[1260-1439]]
            var timerstr = StringManager.replaceAll(array[2], '-', ',');
            var timerlist = JSON.parse("{\"list\": " + timerstr + " }");
            craftedJson.list = timerlist.list;
            console.log('[Info] Recieved: timer from channel ' + ch);
        }
        else if (header == 'ct-setpoint') {
            craftedJson = {
                working: parseFloat(array[1]),
                setpoint: parseFloat(array[2]),
                detecting: parseFloat(array[3])
            };
            console.log('[Info] Recieved: setpoint from channel ' + ch);
        }
        else if (header == 'ct-setbound') {
            craftedJson = {
                upper: parseFloat(array[1]),
                lower: parseFloat(array[2])
            };
            console.log('[Info] Recieved: setbound from channel ' + ch);
        }
        else if (header == 'ct-sbtiming') {
            craftedJson = {
                upper: parseFloat(array[1]),
                lower: parseFloat(array[2]),
                detecting: parseFloat(array[2]),
                working: parseFloat(array[2])
            };
            console.log('[Info] Recieved: sbtiming from channel ' + ch);
        }
        else if (header == 'ct-irrigation') {
            craftedJson = {
                soil_upper: parseFloat(array[1]),
                soil_lower: parseFloat(array[2]),
                soil_detecting: parseFloat(array[3]),
                soil_working: parseFloat(array[4]),
                par_soil_setpoint: parseFloat(array[5]),
                par_detecting: parseFloat(array[6]),
                par_working: parseFloat(array[7]),
                par_acc: parseFloat(array[8]),
                limit_time: parseFloat(array[9]),
                descent_rate: parseFloat(array[10]),
                mode: parseFloat(array[11])
            };
            console.log('[Info] Recieved: Irrigation from channel ' + ch);
        }
        else if (header == 'ct-dfirrigation') {
            craftedJson = {
                upper: parseFloat(array[1]),
                lower: parseFloat(array[2]),
                paracc: parseFloat(array[3]),
                working: parseFloat(array[4]),
                descent: parseFloat(array[5])
            };
            console.log('[Info] Recieved: DF Irrigation from channel ' + ch);
        }
        else if (header == 'ct-advcond') {
            craftedJson = {
                setpoint: parseFloat(array[1]),
                working: parseFloat(array[2]),
                detecting: parseFloat(array[3]),
                sensor: parseInt(array[4]),
                direction: parseInt(array[5]),
                sensor_condition: parseInt(array[6]),
                sensor_direction: parseInt(array[7]),
                sensor_setpoint: parseFloat(array[8]),
                sensor_flag: parseInt(array[9]) == 1 ? true : false,
                timer_flag: parseInt(array[10]) == 1 ? true : false,
                timer_list: JSON.parse(StringManager.replaceAll(array[11], '-', ','))
            };
            console.log('[Info] Recieved: Advance Setpoint Control from channel ' + ch);
        }
        else if (header == 'ct-advsb') {
            craftedJson = {
                upper: parseFloat(array[1]),
                lower: parseFloat(array[2]),
                sensor: parseInt(array[3]),
                direction: parseInt(array[4]),
                sensor_condition: parseInt(array[5]),
                sensor_direction: parseInt(array[6]),
                sensor_setpoint: parseFloat(array[7]),
                sensor_flag: parseInt(array[8]) == 1 ? true : false,
                timer_flag: parseInt(array[9]) == 1 ? true : false,
                timer_list: JSON.parse(StringManager.replaceAll(array[10], '-', ','))
            };
            console.log('[Info] Recieved: Advance Setbound from channel ' + ch);
        }
        else if (header == 'ct-advsbt') {
            craftedJson = {
                upper: parseFloat(array[1]),
                lower: parseFloat(array[2]),
                working: parseFloat(array[3]),
                detecting: parseFloat(array[4]),
                sensor: parseInt(array[5]),
                direction: parseInt(array[6]),
                sensor_condition: parseInt(array[7]),
                sensor_direction: parseInt(array[8]),
                sensor_setpoint: parseFloat(array[9]),
                sensor_flag: parseInt(array[10]) == 1 ? true : false,
                timer_flag: parseInt(array[11]) == 1 ? true : false,
                timer_list: JSON.parse(StringManager.replaceAll(array[12], '-', ','))
            };
            console.log('[Info] Recieved: Advance Timing Setbound from channel ' + ch);
        }
        return {
            header: header.replace('ct-', ''),
            ch: parseInt(array[0]),
            data: craftedJson
        };
    }
}
class ExtractStatus extends ExtractJSON {
    extract(array) {
        var craftedJson = {};
        const header = array[0];
        array.splice(0, 1);
        if (header == 'st-sensors') {
            const arrayNumber = array.map(Number);
            let keys = Object.keys(Model.sensors);
            keys.forEach((key, ind) => {
                craftedJson[key] = arrayNumber[ind];
            });
        }
        else if (header == 'st-datetime') {
            let keys = Object.keys(Model.datetime);
            keys.forEach((key, ind) => {
                craftedJson[key] = array[ind];
            });
            const datetime = craftedJson.date + ' ' + craftedJson.time;
            store_1.default.dispatch(nodes_1.setNodes({ datetime: datetime }));
        }
        else if (header == 'st-paracc') {
            craftedJson = array.map(Number);
        }
        else if (header == 'st-gpio') {
            craftedJson = array.map(Number);
        }
        else if (header == 'st-nodes') {
            const nodes = array.map(el => {
                const els = el.split('-').map(Number);
                return {
                    ec: els[1],
                    volume: els[2]
                };
            });
            store_1.default.dispatch(nodes_1.setNodes({ nodes: nodes }));
            store_1.default.dispatch(nodes_1.setNodes({ supply: nodes[0].ec }));
            // console.log(store.getState().nodes)
        }
        return {
            header: header.replace('st-', ''),
            data: craftedJson
        };
    }
}
/*
    RDY , UPD-TYPE -> TM
    INFO-TYPE -> RM
    DONE -> RM
    {CMD} -> RM
*/
class ReceptionManager {
    constructor(serial) {
        this.serialPort = serial;
        this.serialPort.getReciever().subscribe(data => this.onRecieved(data));
        this.extractStatus = new ExtractStatus();
        this.extractControl = new ExtractControl();
        this.deviceDataSG = new DeviceDataSG();
    }
    getDeviceData() {
        return this.deviceDataSG;
    }
    onRecieved(data) {
        if (data.startsWith("INFO")) {
            let str = data.replace('INFO', '');
            console.log('[Info] Mcu board info: ', str);
        }
        else if (data.startsWith("DONE")) {
            console.log('[Info] MCU requesting is done');
        }
        else if (this.verifyData(data)) {
            const splitedData = this.splitData(data);
            splitedData.forEach(item => {
                const cmdArray = item.split(',');
                // console.log(cmdArray)
                if (cmdArray[0].startsWith('st')) {
                    const extractedData = this.extractStatus.extract(cmdArray);
                    this.deviceDataSG.status[extractedData.header] = extractedData.data;
                }
                else if (cmdArray[0].startsWith('ct')) {
                    const extractedData = this.extractControl.extract(cmdArray);
                    const header = extractedData.header;
                    const data = extractedData.data;
                    const ch = parseInt(extractedData.ch);
                    if (header == 'chst') {
                        const ch = parseInt(extractedData.ch) - 1;
                        this.deviceDataSG.control[ch].manual.status = data.status;
                        this.deviceDataSG.control[ch].sensor = data.sensor;
                        this.deviceDataSG.control[ch].mode = data.mode;
                        this.deviceDataSG.control[ch].ch = data.ch;
                    }
                    else {
                        this.deviceDataSG.control[ch - 1][header] = data;
                    }
                }
                else if (cmdArray[0].startsWith('se')) {
                    ;
                }
            });
        }
    }
    verifyData(data) {
        var match = data.match(/\{[\w\,\-\.\:\[\]]+\}/);
        if (match != null)
            return true;
        else
            return false;
    }
    splitData(data) {
        data = this.replaceAll(data, '{', '');
        data = data.split('}');
        data.splice(data.length - 1, 1);
        return data;
    }
    replaceAll(str, search, replacement) {
        var target = str;
        return target.replace(new RegExp(search, 'g'), replacement);
    }
}
exports.ReceptionManager = ReceptionManager;
class CraftCommand {
    craft(chData) {
        var ch = chData.ch;
        var mode = chData.mode;
        var strcmd = "";
        if (mode == 0) {
            strcmd = "{manual," + ch + "," + chData.manual.status + "}";
        }
        else if (mode == 1) {
            // {timer,1,1,20-60,90-150,200-260}
            let list = chData.timer.list;
            let strlist = [];
            strcmd = "{timer," + ch + "," + chData.timer.mode + ",";
            list.forEach(l => {
                strlist.push(l.join('-'));
            });
            strcmd += strlist.join(',');
            strcmd += "}";
        }
        else if (mode == 2) {
            //{setpoint,channel,setpoint_value, working, detecting, sensor}
            let setpoint = chData.setpoint;
            strcmd = "{setpoint," + ch + "," + setpoint.setpoint + "," + setpoint.working + "," + setpoint.detecting + "," + chData.sensor + "}";
        }
        else if (mode == 3) {
            let setbound = chData.setbound;
            // {setbound, channel, upper,lower,sensor}
            strcmd = "{setbound," + ch + "," + setbound.upper + "," + setbound.lower + "," + chData.sensor + "}";
        }
        else if (mode == 4) {
            let sbtiming = chData.sbtiming;
            // {setbound, channel, upper,lower,sensor}
            strcmd = "{sbtiming," + ch + "," + sbtiming.upper + "," + sbtiming.lower + "," + sbtiming.detecting + "," + sbtiming.working + "," + chData.sensor + "}";
        }
        else if (mode == 5) {
            //{irrigation,ch, irr_mode,soil_up, soil_low, par_acc}
            let irr = chData.irrigation;
            strcmd = "{irrigation," + ch + "," + irr.mode + "," + irr.soil_upper + "," + irr.soil_lower + ","
                + irr.soil_detecting + "," + irr.soil_working + "," + irr.par_soil_setpoint + "," + irr.par_working + ","
                + irr.par_detecting + "," + irr.par_acc + "," + irr.descent_rate + "," + irr.limit_time + "}";
        }
        else if (mode == 6) {
            //{advancecond, ch, setpoint, working, detecting, sensor, direction , sensor_cond, sensor_direction, sensor_set,
            //              sensor_flag, timer_flag, 480-1080,1100-1120}
            var advcond = chData.advcond;
            var sensor_flag = advcond.sensor_flag ? 1 : 0;
            var timer_flag = advcond.timer_flag ? 1 : 0;
            strcmd = "{advancecond," + ch + "," + advcond.setpoint + "," + advcond.working + "," + advcond.detecting + "," + advcond.sensor + "," + advcond.direction + "," + advcond.sensor_condition + "," + advcond.sensor_direction + "," + advcond.sensor_setpoint + "," + sensor_flag + "," + timer_flag + ",";
            // console.log(advcond.timer_list)
            var strlist = advcond.timer_list.map(l => l.join('-'));
            strcmd = strcmd + strlist.join(",") + "}";
        }
        else if (mode == 7) {
            //{advancecond, ch, setpoint, working, detecting, sensor, direction , sensor_cond, sensor_direction, sensor_set,
            //              sensor_flag, timer_flag, 480-1080,1100-1120}
            var advsb = chData.advsb;
            var sensor_flag = advsb.sensor_flag ? 1 : 0;
            var timer_flag = advsb.timer_flag ? 1 : 0;
            strcmd = "{advancesb," + ch + "," + advsb.upper + "," + advsb.lower + "," + advsb.sensor + "," + advsb.direction + "," + advsb.sensor_condition + "," + advsb.sensor_direction + "," + advsb.sensor_setpoint + "," + sensor_flag + "," + timer_flag + ",";
            // console.log(advsb.timer_list)
            var strlist = advsb.timer_list.map(l => l.join('-'));
            strcmd = strcmd + strlist.join(",") + "}";
        }
        else if (mode == 8) {
            //{advancecond, ch, setpoint, working, detecting, sensor, direction , sensor_cond, sensor_direction, sensor_set,
            //              sensor_flag, timer_flag, 480-1080,1100-1120}
            var advsbt = chData.advsbt;
            var sensor_flag = advsbt.sensor_flag ? 1 : 0;
            var timer_flag = advsbt.timer_flag ? 1 : 0;
            strcmd = "{advancesbt," + ch + "," + advsbt.upper + "," + advsbt.lower + "," + advsbt.working + "," + advsbt.detecting + "," + advsbt.sensor + "," + advsbt.direction + "," + advsbt.sensor_condition + "," + advsbt.sensor_direction + "," + advsbt.sensor_setpoint + "," + sensor_flag + "," + timer_flag + ",";
            // console.log(advsbt.timer_list)
            var strlist = advsbt.timer_list.map(l => l.join('-'));
            strcmd = strcmd + strlist.join(",") + "}";
        }
        else if (mode == 9) {
            //{advancecond, ch, setpoint, working, detecting, sensor, direction , sensor_cond, sensor_direction, sensor_set,
            //              sensor_flag, timer_flag, 480-1080,1100-1120}
            var advsbt = chData.dfirrigation;
            strcmd = "{dfirrigation," + ch + "," + advsbt.upper + "," + advsbt.lower + "," + advsbt.paracc + "," + advsbt.working + "," + advsbt.descent + "}";
        }
        console.log(strcmd);
        return strcmd;
    }
}
class DateTime {
    static craftDateTime(datetime) {
        /*
            dt: {date: "2017-01-01", time: "10:46"}
        */
        var date = datetime.date.split('-');
        var time = datetime.time.split(':');
        var payload = {
            day: parseInt(date[2]),
            month: parseInt(date[1]),
            year: parseInt(date[0]) % 2000,
            hour: parseInt(time[0]),
            min: parseInt(time[1])
        };
        return '{datetime,' + payload.day + ',' +
            payload.month + ',' +
            payload.year + ',' +
            payload.hour + ',' +
            payload.min + '}';
    }
}
class TransmitionManager {
    constructor(serial) {
        this.isTunnelAvailable = true;
        this.serialPort = serial;
        this.serialPort.getReciever().subscribe(data => this.onRecieved(data));
        this.writeRoutine();
        this.requestRoutine();
        this.craftCommand = new CraftCommand();
        this.cmdList = ['{checkstatus}'];
    }
    updateDateTime(datetime) {
        const dtStr = DateTime.craftDateTime(datetime);
        console.log(dtStr);
        this.write(dtStr);
    }
    updateControl(control) {
        const cmd = this.craftCommand.craft(control);
        // console.log(cmd);
        this.write(cmd);
    }
    write(data) {
        this.serialPort.getTransmiter().write(data);
    }
    onRecieved(data) {
        this.isTunnelAvailable = true;
        if (data == 'RDY') {
            console.log('[Info] MCU is ready!');
            this.requestControl();
        }
        else if (data.startsWith('UPD')) {
            var resarr = data.split('-');
            var type = resarr[1];
            var ch = (resarr.length > 2) ? resarr[2] : null;
            if (type == 'WATER')
                this.write('{Gwater-control}');
            else if (type == 'SETPOINT')
                this.write('{Gcontrol,setpoint,' + ch + ',1}');
            else if (type == 'SETBOUND')
                this.write('{Gcontrol,setbound,' + ch + ',1}');
            else if (type == 'IRR')
                this.write('{Gcontrol,irrigation,' + ch + ',1}');
            else if (type == 'TIMER')
                this.write('{Gcontrol,timer,' + ch + ',1}');
            else if (type == 'MANUAL')
                this.write('{Gcontrol,manual,' + ch + ',1}');
            else if (type == 'ADVCOND')
                this.write('{Gcontrol,advcond,' + ch + ',1}');
            else if (type == 'ADVSB')
                this.write('{Gcontrol,advsb,' + ch + ',1}');
            else if (type == 'ADVSBT')
                this.write('{Gcontrol,asbsbt,' + ch + ',1}');
            else if (type == 'DFIRR')
                this.write('{Gcontrol,dfirrigation,' + ch + ',1}');
            if (ch)
                this.write('{Gcontrol,channelstatus,' + ch + ',1}');
        }
    }
    writeRoutine() {
        setInterval(() => {
            // console.log(this.isTunnelAvailable, this.cmdList.length, this.serialPort.isAvailable() )
            if (this.isTunnelAvailable && this.cmdList.length > 0 && this.serialPort.isAvailable()) {
                let cmd = this.cmdList.shift();
                this.serialPort.getTransmiter().write(cmd);
                this.isTunnelAvailable = false;
            }
        }, 10);
    }
    requestRoutine() {
        setInterval(() => {
            if (this.serialPort.isAvailable()) {
                this.serialPort.getTransmiter().write('{Gdatetime}');
                this.serialPort.getTransmiter().write('{Gnodes}');
                /*
                    this.serialPort.getTransmiter().write('{Gparacc}')
                    this.serialPort.getTransmiter().write('{Ggpio}')
                    this.serialPort.getTransmiter().write('{Gsensors}')
                */
            }
        }, 1000);
    }
    requestControl() {
        console.log('[Info] Requesting: control');
        this.serialPort.getTransmiter().write('{Gcontrol,channelstatus,1,4}');
        this.serialPort.getTransmiter().write('{Gcontrol,timer,1,4}');
        this.serialPort.getTransmiter().write('{Gcontrol,setbound,1,4}');
        this.serialPort.getTransmiter().write('{Gcontrol,setpoint,1,4}');
        this.serialPort.getTransmiter().write('{Gcontrol,sbtiming,1,4}');
        this.serialPort.getTransmiter().write('{Gcontrol,irrigation,1,4}');
        this.serialPort.getTransmiter().write('{Gcontrol,dfirrigation,1,4}');
        this.serialPort.getTransmiter().write('{Gcontrol,advcond,1,4}');
        this.serialPort.getTransmiter().write('{Gcontrol,advsb,1,4}');
        this.serialPort.getTransmiter().write('{Gcontrol,advsbt,1,4}');
        this.serialPort.getTransmiter().write('{done}');
    }
}
exports.TransmitionManager = TransmitionManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLWNvbW11bmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvZGV2aWNlL2RldmljZS1jb21tdW5pY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLHNEQUF1QztBQUN2QyxvREFBMkI7QUFDM0IscURBQTRCO0FBQzVCLDBDQUF5QztBQUN6QyxNQUFNLGFBQWE7SUFDUixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsV0FBVztRQUM3QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDakIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0o7QUFFRCxNQUFzQixVQUFVO0NBSS9CO0FBSkQsZ0NBSUM7QUFFRCxNQUFhLFlBQWEsU0FBUSxVQUFVO0lBUXhDO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUM7WUFDbEYsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BCLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyQixDQUFBO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxL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