"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const vmn_logger_1 = __importDefault(require("../../logger/vmn-logger"));
class VmnLoggerRouter extends router_1.Router {
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
                const sta = interval.station ? parseInt(interval.station) : 1;
                vmn_logger_1.default.getLog(startTime, endTime, intv).then(rows => {
                    if (rows.length == 0) {
                        res.json([]);
                        return;
                    }
                    res.json(rows.map(row => ({
                        station: sta,
                        datetime: row.datetime,
                        ec: row.nodes[sta].ec,
                        volume: row.nodes[sta].volume
                    })));
                });
            }
            else {
                res.json({ messgae: 'Error: Invalid format.' });
            }
        });
        this.router.get('/summary', (req, res) => {
            const interval = req.query;
            if (interval.start && interval.end) {
                const startTime = moment_1.default(interval.start);
                const endTime = moment_1.default(interval.end);
                console.log(startTime, endTime);
                vmn_logger_1.default.getLog(startTime, endTime, 1).then(rows => {
                    if (rows.length == 0) {
                        res.json([]);
                        return;
                    }
                    let data = [];
                    for (let i = 1; i < rows[0].nodes.length; i++) {
                        data.push({
                            volStart: rows[0].nodes[i].volume,
                            volStop: rows[rows.length - 1].nodes[i].volume,
                            volDiff: rows[rows.length - 1].nodes[i].volume - rows[0].nodes[0].volume
                        });
                    }
                    res.json(data);
                });
            }
            else {
                res.json({ messgae: 'Error: Invalid format.' });
            }
        });
        this.router.get('/interval/csv', (req, res) => {
            const interval = req.query;
            if (interval.start && interval.end && interval.interval) {
                const startTime = moment_1.default(interval.start);
                const endTime = moment_1.default(interval.end);
                const intv = parseInt(interval.interval);
                const sta = interval.station ? parseInt(interval.station) : 0;
                vmn_logger_1.default.getLog(startTime, endTime, intv).then(rows => {
                    if (rows.length == 0) {
                        res.json([]);
                        return;
                    }
                    console.log(rows[0]);
                    const data = rows.map(row => {
                        return {
                            station: sta,
                            datetime: row.datetime,
                            ec: row.nodes[sta].ec,
                            volume: row.nodes[sta].ec
                        };
                    });
                    const keys = Object.keys(data[0]);
                    console.log(keys);
                    res.csv(data, {
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
exports.default = VmnLoggerRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm1uTG9nZ2VyUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3R5cGVzL3dzL3JvdXRlci92bW5Mb2dnZXJSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBa0M7QUFDbEMsc0RBQTZCO0FBQzdCLG9EQUE0QjtBQUM1Qix5RUFBK0M7QUFDL0MsTUFBcUIsZUFBZ0IsU0FBUSxlQUFNO0lBQy9DO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFDTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDM0IsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDckQsTUFBTSxTQUFTLEdBQUcsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sT0FBTyxHQUFHLGdCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzdELG9CQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFB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