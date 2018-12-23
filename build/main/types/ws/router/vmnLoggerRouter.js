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
        this.router.get('/interval/csv', (req, res) => {
            const interval = req.query;
            // (interval)
            if (interval.start && interval.end && interval.interval) {
                const startTime = moment_1.default(interval.start);
                const endTime = moment_1.default(interval.end);
                const intv = parseInt(interval.interval);
                const sta = interval.station ? parseInt(interval.station) : 0;
                vmn_logger_1.default.getLog(startTime, endTime, intv).then(rows => {
                    const data = rows.map(row => {
                        return {
                            station: sta,
                            datetime: row.datetime,
                            ec: row.nodes[sta].ec,
                            volume: row.nodes[sta].ec
                        };
                    });
                    const keys = Object.keys(data[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm1uTG9nZ2VyUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3R5cGVzL3dzL3JvdXRlci92bW5Mb2dnZXJSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBa0M7QUFDbEMsc0RBQTZCO0FBQzdCLG9EQUE0QjtBQUM1Qix5RUFBK0M7QUFDL0MsTUFBcUIsZUFBZ0IsU0FBUSxlQUFNO0lBQy9DO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFDTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFO1lBQ3BDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDM0IsSUFBRyxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBQztnQkFDbkQsTUFBTSxTQUFTLEdBQUcsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sT0FBTyxHQUFHLGdCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUE7Z0JBQ3pELG9CQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFB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