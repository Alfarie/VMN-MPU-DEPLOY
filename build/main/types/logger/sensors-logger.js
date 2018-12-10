"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const logger_1 = __importDefault(require("./logger"));
const configuration_1 = __importDefault(require("../configuration"));
const device_1 = __importDefault(require("../device/device"));
class SensorLogger extends logger_1.default {
    static getInstance() {
        if (!this.instance)
            this.instance = new SensorLogger();
        return this.instance;
    }
    constructor() {
        super();
        this.createTable();
        this.sensorsLoggingRoutine();
    }
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS sensors_logger(
            timestamp INTEGER PRIMARY KEY NOT NULL,
            datetime TEXT NOT NULL,
            soil NUMBER NOT NULL,
            temperature NUMBER NOT NULL,
            humidity NUMBER NOT NULL,
            vpd NUMBER NOT NULL,
            par NUMBER NOT NULL,
            co2 NUMBER NOT NULL,
            paracc NUMBER NOT NULL)
        `;
        this.db.exec(sql);
    }
    log(json) {
        const sql = `INSERT INTO sensors_logger(timestamp,datetime,soil,temperature,humidity,vpd,par,co2,paracc)
        VALUES(?,?,?,?,?,?,?,?,?);`;
        const params = [
            moment_1.default(json.datetime).unix(),
            json.datetime,
            json.soil,
            json.temperature,
            json.humidity,
            json.vpd,
            json.par,
            json.co2,
            json.paracc
        ];
        this.db.execParams(sql, params).catch(err => {
            const message = params.toString() + ' ' + err;
            console.log(message);
        });
    }
    getLog(start, end, interval) {
        return new Promise((resolve, reject) => {
            var startUnix = start.unix();
            var endUnix = end.unix();
            if (startUnix == endUnix) {
                endUnix = end.add(1440, 'minute').unix();
            }
            let sql = 'SELECT * FROM sensors_logger WHERE (timestamp between ? AND ?) AND round((timestamp / 60)) % ? == 0;';
            let params = [startUnix, endUnix, interval];
            this.db.getDB().all(sql, params, (err, rows) => {
                if (err)
                    reject(err.message);
                console.log(rows.length);
                resolve(rows);
            });
        });
    }
    getLastLog(interval, limit) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM sensors_logger WHERE round((timestamp / 60)) % ? == 0 ORDER BY timestamp DESC LIMIT ?';
            let params = [interval, limit];
            this.db.getDB().all(sql, params, (err, rows) => {
                if (err)
                    reject(err.message);
                // console.log(rows);
                resolve(rows);
            });
        });
    }
    getStatisticalData(start, end) {
        return new Promise((resolve, reject) => {
            var startUnix = start.unix();
            var endUnix = end.unix();
            if (startUnix == endUnix) {
                endUnix = end.add(1440, 'minute').unix();
            }
            let sql = 'SELECT * FROM sensors_logger WHERE (timestamp between ? AND ?)';
            let params = [startUnix, endUnix];
            try {
                this.db.getDB().all(sql, params, (err, rows) => {
                    if (err)
                        reject(err.message);
                    var soil = [];
                    var temperature = [];
                    var humidity = [];
                    var vpd = [];
                    var co2 = [];
                    var par = [];
                    rows.forEach(row => {
                        soil.push(row.soil);
                        temperature.push(row.temperature);
                        humidity.push(row.humidity);
                        vpd.push(row.vpd);
                        co2.push(row.co2);
                        par.push(row.par);
                    });
                    var data = {
                        soil: [parseInt(Math.max(...soil).toFixed(2)), soil.reduce((p, c) => p + c) / soil.length, parseInt(Math.min(...soil).toFixed(2))],
                        temperature: [parseInt(Math.max(...temperature).toFixed(2)), temperature.reduce((p, c) => p + c) / temperature.length, parseInt(Math.min(...temperature).toFixed(2))],
                        humidity: [parseInt(Math.max(...humidity).toFixed(2)), humidity.reduce((p, c) => p + c) / humidity.length, parseInt(Math.min(...humidity).toFixed(2))],
                        vpd: [parseInt(Math.max(...vpd).toFixed(2)), vpd.reduce((p, c) => p + c) / vpd.length, parseInt(Math.min(...vpd).toFixed(2))],
                        co2: [parseInt(Math.max(...co2).toFixed(2)), co2.reduce((p, c) => p + c) / co2.length, parseInt(Math.min(...co2).toFixed(2))],
                        par: [parseInt(Math.max(...par).toFixed(2)), par.reduce((p, c) => p + c) / par.length, parseInt(Math.min(...par).toFixed(2))]
                    };
                    resolve(data);
                });
            }
            catch (ex) {
                reject(ex);
            }
        });
    }
    sensorsLoggingRoutine() {
        setInterval(() => {
            var loggingData = device_1.default.getDeviceData().status.sensors;
            const datetime = device_1.default.getDeviceData().status.datetime;
            loggingData.datetime = datetime.date + ' ' + datetime.time;
            if (this.currentTime == loggingData.datetime) {
                console.log('[Info] Current datetime is not updating from previous datetime');
                return;
            }
            this.currentTime = loggingData.datetime;
            this.log(device_1.default.getDeviceData().status.sensors);
        }, configuration_1.default.getConfig().loggerTime);
    }
}
exports.default = SensorLogger.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vuc29ycy1sb2dnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvbG9nZ2VyL3NlbnNvcnMtbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0RBQTJCO0FBQzNCLHNEQUE2QjtBQUM3QixxRUFBNkM7QUFDN0MsOERBQTZDO0FBRTdDLE1BQU0sWUFBYSxTQUFRLGdCQUFNO0lBR3RCLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUN0RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDeEIsQ0FBQztJQUNEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDbEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUE7SUFDaEMsQ0FBQztJQUVELFdBQVc7UUFDUCxNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7OztTQVVYLENBQUE7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyQixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVM7UUFDVCxNQUFNLEdBQUcsR0FBRzttQ0FDZSxDQUFBO1FBQzNCLE1BQU0sTUFBTSxHQUFHO1lBQ1gsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRO1lBQ2IsSUFBSSxDQUFDLElBQUk7WUFDVCxJQUFJLENBQUMsV0FBVztZQUNoQixJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxHQUFHO1lBQ1IsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJLENBQUMsR0FBRztZQUNSLElBQUksQ0FBQyxNQUFNO1NBQ2QsQ0FBQTtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFD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QyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3SCxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvSixRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoSixHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2SCxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2SCxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUMxSCxDQUFBO29CQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUE7YUFDTDtZQUNELE9BQU0sRUFBRSxFQUFDO2dCQUNMLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUNiO1FBRUwsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU8scUJBQXFCO1FBQ3pCLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDYixJQUFJLFdBQVcsR0FBRyxnQkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUE7WUFDOUQsTUFBTSxRQUFRLEdBQUcsZ0JBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO1lBQzlELFdBQVcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUUzRCxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBQztnQkFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFBO2dCQUM3RSxPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFFeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMxRCxDQUFDLEVBQUUsdUJBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMifQ==