"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const moment_1 = __importDefault(require("moment"));
class SGLogger extends logger_1.default {
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
            moment_1.default(data.datetime).unix(),
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
exports.default = SGLogger.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ctbG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2xvZ2dlci9zZy1sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBNkI7QUFDN0Isb0RBQTRCO0FBRTVCLE1BQU0sUUFBUyxTQUFRLGdCQUFNO0lBRWxCLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQTtRQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDeEIsQ0FBQztJQUNEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFTO1FBQ1QsTUFBTSxNQUFNLEdBQUc7WUFDWCxnQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsT0FBTztTQUNmLENBQUE7UUFDRCxNQUFNLEdBQUcsR0FBRyxvRUFBb0UsQ0FBQTtRQUNoRixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFdBQVc7UUFDUCxNQUFNLEdBQUcsR0FBRzs7OztTQUlYLENBQUE7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyQixDQUFDO0NBQ0o7QUFFRCxrQkFBZSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMifQ==