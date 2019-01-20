"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const logger_1 = __importDefault(require("./logger"));
// import Configuration from '../configuration';
// import DeviceManager from '../device/device';
class SensorLogger extends logger_1.default {
    // private currentTime: String;
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
        // setInterval(() => {
        //     var loggingData = DeviceManager.getDeviceData().status.sensors
        //     const datetime = DeviceManager.getDeviceData().status.datetime
        //     loggingData.datetime = datetime.date + ' ' + datetime.time;
        //     if(this.currentTime == loggingData.datetime){
        //         console.log('[Info] Current datetime is not updating from previous datetime')
        //         return;
        //     }
        //     this.currentTime = loggingData.datetime;
        //     this.log(DeviceManager.getDeviceData().status.sensors)
        // }, Configuration.getConfig().loggerTime)
    }
}
exports.default = SensorLogger.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vuc29ycy1sb2dnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvbG9nZ2VyL3NlbnNvcnMtbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0RBQTJCO0FBQzNCLHNEQUE2QjtBQUM3QixnREFBZ0Q7QUFDaEQsZ0RBQWdEO0FBRWhELE1BQU0sWUFBYSxTQUFRLGdCQUFNO0lBRTdCLCtCQUErQjtJQUN4QixNQUFNLENBQUMsV0FBVztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUE7UUFDdEQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ3hCLENBQUM7SUFDRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO0lBQ2hDLENBQUM7SUFFRCxXQUFXO1FBQ1AsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs7Ozs7U0FVWCxDQUFBO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFTO1FBQ1QsTUFBTSxHQUFHLEdBQUc7bUNBQ2UsQ0FBQTtRQUMzQixNQUFNLE1BQU0sR0FBRztZQUNYLGdCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxJQUFJO1lBQ1QsSUFBSSxDQUFDLFdBQVc7WUFDaEIsSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsR0FBRztZQUNSLElBQUksQ0FBQyxHQUFHO1lBQ1IsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJLENBQUMsTUFBTTtTQUNkLENBQUE7UUFDRCxJQUFJLENBQUMsRUFBRSxD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Q0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0gsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0osUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEosR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkgsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkgsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDMUgsQ0FBQTtvQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFBO2FBQ0w7WUFDRCxPQUFNLEVBQUUsRUFBQztnQkFDTCxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7YUFDYjtRQUVMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVPLHFCQUFxQjtRQUN6QixzQkFBc0I7UUFDdEIscUVBQXFFO1FBQ3JFLHFFQUFxRTtRQUNyRSxrRUFBa0U7UUFFbEUsb0RBQW9EO1FBQ3BELHdGQUF3RjtRQUN4RixrQkFBa0I7UUFDbEIsUUFBUTtRQUVSLCtDQUErQztRQUUvQyw2REFBNkQ7UUFDN0QsMkNBQTJDO0lBQy9DLENBQUM7Q0FDSjtBQUVELGtCQUFlLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyJ9