"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const sensors_logger_1 = __importDefault(require("../../logger/sensors-logger"));
class LoggerRouter extends router_1.Router {
    constructor() {
        super();
        this.name = '/logger';
        this.router = express_1.default.Router();
        this.mountRoute();
    }
    mountRoute() {
        this.router.get('/interval', (req, res) => {
            const interval = req.query;
            if (interval.start && interval.end && interval.interval) {
                const startTime = moment_1.default(interval.start);
                const endTime = moment_1.default(interval.end);
                const intv = parseInt(interval.interval);
                sensors_logger_1.default.getLog(startTime, endTime, intv).then(rows => res.json(rows));
            }
            else {
                res.json({ messgae: 'Error: Invalid format.' });
            }
        });
        this.router.get('/statistic', (req, res) => {
            const interval = req.query;
            if (interval.start && interval.end) {
                const startTime = moment_1.default(interval.start);
                const endTime = moment_1.default(interval.end);
                sensors_logger_1.default.getStatisticalData(startTime, endTime).then(rows => res.json(rows));
            }
            else {
                res.json({ messgae: 'Error: Invalid format.' });
            }
        });
        this.router.get('/least', (req, res) => {
            const interval = req.query;
            if (interval.interval && interval.limit) {
                const intv = parseInt(interval.interval);
                const limit = parseInt(interval.limit);
                sensors_logger_1.default.getLastLog(intv, limit).then(rows => res.json(rows));
            }
            else {
                res.json({ messgae: 'Error: Invalid format.' });
            }
        });
        this.router.get('/interval/csv', (req, res) => {
            const interval = req.query;
            console.log(interval);
            if (interval.start && interval.end && interval.interval) {
                const startTime = moment_1.default(interval.start);
                const endTime = moment_1.default(interval.end);
                const intv = parseInt(interval.interval);
                sensors_logger_1.default.getLog(startTime, endTime, intv).then(rows => {
                    const keys = Object.keys(rows[0]);
                    res.csv(rows, {
                        fields: keys
                    });
                });
            }
            else {
                res.json({ messgae: 'Error: Invalid format.' });
            }
        });
    }
}
exports.default = LoggerRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3R5cGVzL3dzL3JvdXRlci9sb2dnZXJSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBa0M7QUFDbEMsc0RBQTZCO0FBQzdCLG9EQUE0QjtBQUM1QixpRkFBa0Q7QUFDbEQsTUFBcUIsWUFBYSxTQUFRLGVBQU07SUFDNUM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUNPLFVBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUU7WUFDcEMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFDO2dCQUNuRCxNQUFNLFNBQVMsR0FBRyxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekMsTUFBTSxPQUFPLEdBQUcsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3hDLHdCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFBO2FBQzFFO2lCQUNJO2dCQUNE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