import * as Model from './device-model';
import moment from 'moment';
import store from '../store';
import { setNodes } from '../store/nodes';
class StringManager {
    static replaceAll(str, search, replacement) {
        var target = str;
        return target.replace(new RegExp(search, 'g'), replacement);
    }
}
export class DeviceData {
}
export class DeviceDataSG extends DeviceData {
    constructor() {
        super();
        this.status = {
            sensors: JSON.parse(JSON.stringify(Model.sensors)),
            datetime: { date: moment().format('YYYY-MM-DD'), time: moment().format('HH:mm:ss') },
            paracc: [0, 0, 0, 0],
            gpio: [0, 0, 0, 0]
        };
        this.control = [JSON.parse(JSON.stringify(Model.control)),
            JSON.parse(JSON.stringify(Model.control)),
            JSON.parse(JSON.stringify(Model.control)),
            JSON.parse(JSON.stringify(Model.control))];
    }
}
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
            store.dispatch(setNodes({ datetime: datetime }));
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
            store.dispatch(setNodes({ nodes: nodes }));
            store.dispatch(setNodes({ supply: nodes[0].ec }));
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
export class ReceptionManager {
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
export class TransmitionManager {
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
                this.serialPort.getTransmiter().write('{Ggpio}');
                /*
                    this.serialPort.getTransmiter().write('{Gparacc}')
                    
                    this.serialPort.getTransmiter().write('{Gsensors}')
                */
            }
        }, 1000);
    }
    requestControl() {
        console.log('[Info] Requesting: control');
        this.serialPort.getTransmiter().write('{Gcontrol,channelstatus,1,4}');
        this.serialPort.getTransmiter().write('{Gcontrol,timer,1,4}');
        // this.serialPort.getTransmiter().write('{Gcontrol,setbound,1,4}');
        // this.serialPort.getTransmiter().write('{Gcontrol,setpoint,1,4}');
        // this.serialPort.getTransmiter().write('{Gcontrol,sbtiming,1,4}');
        // this.serialPort.getTransmiter().write('{Gcontrol,irrigation,1,4}');
        // this.serialPort.getTransmiter().write('{Gcontrol,dfirrigation,1,4}');
        // this.serialPort.getTransmiter().write('{Gcontrol,advcond,1,4}');
        // this.serialPort.getTransmiter().write('{Gcontrol,advsb,1,4}');
        // this.serialPort.getTransmiter().write('{Gcontrol,advsbt,1,4}');
        this.serialPort.getTransmiter().write('{done}');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLWNvbW11bmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvZGV2aWNlL2RldmljZS1jb21tdW5pY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sS0FBSyxLQUFLLE1BQU0sZ0JBQWdCLENBQUE7QUFDdkMsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBQzNCLE9BQU8sS0FBSyxNQUFNLFVBQVUsQ0FBQTtBQUM1QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDekMsTUFBTSxhQUFhO0lBQ1IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFdBQVc7UUFDN0MsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNKO0FBRUQsTUFBTSxPQUFnQixVQUFVO0NBSS9CO0FBRUQsTUFBTSxPQUFPLFlBQWEsU0FBUSxVQUFVO0lBUXhDO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFDO1lBQ2xGLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQixJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxF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