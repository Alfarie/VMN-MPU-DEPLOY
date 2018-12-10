import Logger from './logger';
import moment from 'moment';
import store from '../store';
import Configuration from '../configuration';
class VmnLogger extends Logger {
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
            moment(data.datetime).unix(),
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
            const { datetime } = store.getState().nodes;
            if (this.currentTime == datetime) {
                console.log('[Info] Current datetime is not updating from previous datetime');
                return;
            }
            this.currentTime = datetime;
            this.log({
                datetime,
                data: store.getState().nodes
            });
        }, Configuration.getConfig().loggerTime);
    }
}
export default VmnLogger.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm1uLWxvZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy9sb2dnZXIvdm1uLWxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUE7QUFDN0IsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxNQUFNLFVBQVUsQ0FBQTtBQUM1QixPQUFPLGFBQWEsTUFBTSxrQkFBa0IsQ0FBQztBQUU3QyxNQUFNLFNBQVUsU0FBUSxNQUFNO0lBR25CLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQTtRQUNuRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDeEIsQ0FBQztJQUNEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDbEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFJO1FBQ0osTUFBTSxNQUFNLEdBQUc7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUM1QixDQUFBO1FBQ0QsTUFBTSxHQUFHLEdBQUcsa0VBQWtFLENBQUE7UUFDOUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBb0IsRUFBRSxHQUFrQixFQUFFLFFBQWdCO1FBQ3BFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQzVCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUV4QixJQUFJLFNBQVMsSUFBSSxPQUFPLEVBQUU7Z0JBQ3RCLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTthQUMzQztZQUNELElBQUksR0FBRyxHQUFHLGtHQUFrRyxDQUFDO1lBQzdHLElBQUksTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUMzQyxJQUFJLEdBQUc7b0JBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFBLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxXQUFXO1FBQ1AsTUFBTSxHQUFHLEdBQUc7Ozs7U0FJWCxDQUFBO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVPLGlCQUFpQjtRQUNyQixXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFFNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLFFBQVEsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFBO2dCQUM3RSxPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUU1QixJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNMLFFBQVE7Z0JBQ1IsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLO2FBQy9CLENBQUMsQ0FBQTtRQUVOLENBQUMsRUFBRSxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFFLENBQUM7SUFFOUMsQ0FBQztDQUNKO0FBRUQsZUFBZSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMifQ==