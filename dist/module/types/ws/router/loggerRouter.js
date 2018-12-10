import { Router } from './router';
import express from 'express';
import moment from 'moment';
import SGLogger from '../../logger/sensors-logger';
export default class LoggerRouter extends Router {
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
                SGLogger.getLog(startTime, endTime, intv).then(rows => res.json(rows));
            }
            else {
                res.json({ messgae: 'Error: Invalid format.' });
            }
        });
        this.router.get('/statistic', (req, res) => {
            const interval = req.query;
            if (interval.start && interval.end) {
                const startTime = moment(interval.start);
                const endTime = moment(interval.end);
                SGLogger.getStatisticalData(startTime, endTime).then(rows => res.json(rows));
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
                SGLogger.getLastLog(intv, limit).then(rows => res.json(rows));
            }
            else {
                res.json({ messgae: 'Error: Invalid format.' });
            }
        });
        this.router.get('/interval/csv', (req, res) => {
            const interval = req.query;
            console.log(interval);
            if (interval.start && interval.end && interval.interval) {
                const startTime = moment(interval.start);
                const endTime = moment(interval.end);
                const intv = parseInt(interval.interval);
                SGLogger.getLog(startTime, endTime, intv).then(rows => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3R5cGVzL3dzL3JvdXRlci9sb2dnZXJSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUE7QUFDN0IsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sUUFBUSxNQUFNLDZCQUE2QixDQUFBO0FBQ2xELE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLE1BQU07SUFDNUM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBQ08sVUFBVTtRQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRTtZQUNwQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQzNCLElBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUM7Z0JBQ25ELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3hDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FB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