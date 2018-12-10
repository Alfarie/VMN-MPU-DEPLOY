"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const moment_1 = __importDefault(require("moment"));
const store_1 = __importDefault(require("../store"));
const configuration_1 = __importDefault(require("../configuration"));
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
            if (this.currentTime == datetime) {
                console.log('[Info] Current datetime is not updating from previous datetime');
                return;
            }
            this.currentTime = datetime;
            this.log({
                datetime,
                data: store_1.default.getState().nodes
            });
        }, configuration_1.default.getConfig().loggerTime);
    }
}
exports.default = VmnLogger.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm1uLWxvZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy9sb2dnZXIvdm1uLWxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE2QjtBQUM3QixvREFBNEI7QUFDNUIscURBQTRCO0FBQzVCLHFFQUE2QztBQUU3QyxNQUFNLFNBQVUsU0FBUSxnQkFBTTtJQUduQixNQUFNLENBQUMsV0FBVztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUE7UUFDbkQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ3hCLENBQUM7SUFDRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBSTtRQUNKLE1BQU0sTUFBTSxHQUFHO1lBQ1gsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRO1lBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQzVCLENBQUE7UUFDRCxNQUFNLEdBQUcsR0FBRyxrRUFBa0UsQ0FBQTtRQUM5RSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFvQixFQUFFLEdBQWtCLEVBQUUsUUFBZ0I7UUFDcEUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDNUIsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO1lBRXhCLElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtnQkFDdEIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO2FBQzNDO1lBQ0QsSUFBSSxHQUFHLEdBQUcsa0dBQWtHLENBQUM7WUFDN0csSUFBSSxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQzNDLElBQUksR0FBRztvQkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUEsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELFdBQVc7UUFDUCxNQUFNLEdBQUcsR0FBRzs7OztTQUlYLENBQUE7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyQixDQUFDO0lBRU8saUJBQWlCO1FBQ3JCLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDYixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUU1QyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxFQUFFO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxDQUFDLENBQUE7Z0JBQzdFLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBRTVCLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ0wsUUFBUTtnQkFDUixJQUFJLEVBQUUsZUFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUs7YUFDL0IsQ0FBQyxDQUFBO1FBRU4sQ0FBQyxFQUFFLHVCQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFFLENBQUM7SUFFOUMsQ0FBQztDQUNKO0FBRUQsa0JBQWUsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDIn0=