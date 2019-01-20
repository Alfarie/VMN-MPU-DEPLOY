"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const moment_1 = __importDefault(require("moment"));
const store_1 = __importDefault(require("../store"));
const configuration_1 = __importDefault(require("../configuration"));
const device_1 = __importDefault(require("../device/device"));
class VmnLogger extends logger_1.default {
    static getInstance() {
        if (!this.instance)
            this.instance = new VmnLogger();
        return this.instance;
    }
    constructor() {
        super();
        this.createTable();
        this.vmnLoggingRoutine();
    }
    log(data) {
        const params = [
            moment_1.default(data.datetime).unix(),
            data.datetime,
            JSON.stringify(data.data)
        ];
        const sql = `INSERT INTO vmn_logger(timestamp, datetime, data) VALUES(?,?,?);`;
        this.db.execParams(sql, params);
    }
    getLog(start, end, interval) {
        return new Promise((resolve, reject) => {
            var startUnix = start.unix();
            var endUnix = end.unix();
            if (startUnix == endUnix) {
                endUnix = end.add(1440, 'minute').unix();
            }
            let sql = 'SELECT * FROM vmn_logger WHERE  (timestamp between ? AND ?) AND round((timestamp / 60)) % ? == 0';
            let params = [startUnix, endUnix, interval];
            this.db.getDB().all(sql, params, (err, rows) => {
                if (err)
                    reject(err.message);
                resolve(rows.map(row => JSON.parse(row.data)));
            });
        });
    }
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS vmn_logger (
            timestamp INTEGER PRIMARY KEY NOT NULL,
            datetime TEXT NOT NULL,
            data TEXT NOT NULL)
        `;
        this.db.exec(sql);
    }
    vmnLoggingRoutine() {
        setInterval(() => {
            const { datetime } = store_1.default.getState().nodes;
            // const datetime = moment().format('YYYY-MM-DD HH:mm:ss')
            if (datetime == this.currentTime) {
                console.log('[Info] Current datetime is not updating from previous datetime');
                return;
            }
            this.currentTime = datetime;
            let currentSupply = this.currentSupply();
            let totalSupply = this.totalSupply();
            let data = store_1.default.getState().nodes.nodes.map((node, ind) => {
                if (ind == 0) {
                    let val = { current: 0, total: 0, percent: 0 };
                    return Object.assign({}, node, val);
                }
                else {
                    let val = { current: currentSupply[ind - 1], total: totalSupply[ind - 1], percent: node.volume / currentSupply[ind - 1] * 100 };
                    return Object.assign({}, node, val);
                }
            });
            let state = store_1.default.getState().nodes;
            state.nodes = data;
            this.log({
                datetime,
                data: state
            });
        }, configuration_1.default.getConfig().loggerTime);
    }
    totalSupply() {
        const operation = store_1.default.getState().operation;
        const control = device_1.default.getDeviceData().control;
        let flowRate = operation['water-flow'];
        const flowRateLS = flowRate.map(flow => flow * 0.000277777778);
        // total consume calculation
        var totalSecond = control.map(ctrl => {
            var second = 0;
            ctrl.timer.list.forEach((list) => {
                second += list[1];
            });
            return [second, second];
        });
        totalSecond = JSON.parse('[' + totalSecond.join() + ']');
        var totalSupply = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < totalSupply.length; i += 1) {
            totalSupply[i] = totalSecond[i] * flowRateLS[i] * 1000;
        }
        return totalSupply;
    }
    currentSupply() {
        const { datetime } = store_1.default.getState().nodes;
        const operation = store_1.default.getState().operation;
        const control = device_1.default.getDeviceData().control;
        let flowRate = operation['water-flow'];
        const flowRateLS = flowRate.map(flow => flow * 0.000277777778);
        // total consume calculation
        // current consume calculation
        //get datetime to current min
        const currentTime = moment_1.default(datetime);
        const currentMin = currentTime.hour() * 60 + currentTime.minute();
        var currentSecond = control.map(ctrl => {
            var second = 0;
            ctrl.timer.list.forEach((list) => {
                if (list[0] >= currentMin)
                    return;
                second += list[1];
            });
            return [second, second];
        });
        currentSecond = JSON.parse('[' + currentSecond.join() + ']');
        var currentSupply = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < currentSupply.length; i += 1) {
            currentSupply[i] = currentSecond[i] * flowRateLS[i] * 1000;
        }
        return currentSupply;
    }
}
exports.default = VmnLogger.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm1uLWxvZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy9sb2dnZXIvdm1uLWxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE2QjtBQUM3QixvREFBNEI7QUFDNUIscURBQTRCO0FBQzVCLHFFQUE2QztBQUM3Qyw4REFBNkM7QUFFN0MsTUFBTSxTQUFVLFNBQVEsZ0JBQU07SUFHbkIsTUFBTSxDQUFDLFdBQVc7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFBO1FBQ25ELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN4QixDQUFDO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNsQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQUk7UUFDSixNQUFNLE1BQU0sR0FBRztZQUNYLGdCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUM1QixDQUFBO1FBQ0QsTUFBTSxHQUFHLEdBQUcsa0VBQWtFLENBQUE7UUFDOUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBb0IsRUFBRSxHQUFrQixFQUFFLFFBQWdCO1FBQ3BFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQzVCLElBQUksT0FBTyxH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