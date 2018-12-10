import Logger from './logger';
import moment from 'moment';
class SGLogger extends Logger {
    static getInstance() {
        if (!this.instance)
            this.instance = new SGLogger();
        return this.instance;
    }
    constructor() {
        super();
        this.createTable();
    }
    log(data) {
        const params = [
            moment(data.datetime).unix(),
            data.datetime,
            data.message
        ];
        const sql = `INSERT INTO sg_logger(timestamp, datetime, message) VALUES(?,?,?);`;
        this.db.execParams(sql, params);
    }
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS sg_logger (
            timestamp INTEGER PRIMARY KEY NOT NULL,
            datetime TEXT NOT NULL,
            message TEXT NOT NULL)
        `;
        this.db.exec(sql);
    }
}
export default SGLogger.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ctbG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2xvZ2dlci9zZy1sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFBO0FBQzdCLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUU1QixNQUFNLFFBQVMsU0FBUSxNQUFNO0lBRWxCLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQTtRQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDeEIsQ0FBQztJQUNEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFTO1FBQ1QsTUFBTSxNQUFNLEdBQUc7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxPQUFPO1NBQ2YsQ0FBQTtRQUNELE1BQU0sR0FBRyxHQUFHLG9FQUFvRSxDQUFBO1FBQ2hGLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsV0FBVztRQUNQLE1BQU0sR0FBRyxHQUFHOzs7O1NBSVgsQ0FBQTtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7Q0FDSjtBQUVELGVBQWUsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDIn0=