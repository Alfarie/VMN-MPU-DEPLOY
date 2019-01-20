import { Router } from './router';
import express from 'express';
import moment from 'moment';
import VmnLogger from '../../logger/vmn-logger';
export default class VmnLoggerRouter extends Router {
    constructor() {
        super();
        this.name = '/logger';
        this.router = express.Router();
        this.mountRoute();
    }
    mountRoute() {
        this.router.get('/interval', (req, res) => {
            const interval = req.query;
            if (interval.start && interval.end && interval.interval) {
                const startTime = moment(interval.start);
                const endTime = moment(interval.end);
                const intv = parseInt(interval.interval);
                const sta = interval.station ? parseInt(interval.station) : 1;
                VmnLogger.getLog(startTime, endTime, intv).then(rows => {
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
                const startTime = moment(interval.start);
                const endTime = moment(interval.end);
                // console.log(startTime, endTime);
                VmnLogger.getLog(startTime, endTime, 1).then(rows => {
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
                const startTime = moment(interval.start);
                const endTime = moment(interval.end);
                const intv = parseInt(interval.interval);
                const sta = interval.station ? parseInt(interval.station) : 0;
                VmnLogger.getLog(startTime, endTime, intv).then(rows => {
                    if (rows.length == 0) {
                        res.json([]);
                        return;
                    }
                    // "current":8166.6666732,"total":8166.6666732,"percent":3.6734693848163262
                    console.log(rows[0]);
                    const data = rows.map(row => {
                        return {
                            station: sta,
                            datetime: row.datetime,
                            ec: row.nodes[sta].ec,
                            volume: row.nodes[sta].volume,
                            current: +row.nodes[sta].current.toFixed(0),
                            total: +row.nodes[sta].total.toFixed(0),
                            percent: +row.nodes[sta].percent.toFixed(0)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm1uTG9nZ2VyUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3R5cGVzL3dzL3JvdXRlci92bW5Mb2dnZXJSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUE7QUFDN0IsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFBO0FBQy9DLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxNQUFNO0lBQy9DO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUNPLFVBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDdEMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxR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