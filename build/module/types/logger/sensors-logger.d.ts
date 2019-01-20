import moment from 'moment';
import Logger from './logger';
declare class SensorLogger extends Logger {
    static instance: SensorLogger;
    static getInstance(): SensorLogger;
    constructor();
    createTable(): void;
    log(json: any): void;
    getLog(start: moment.Moment, end: moment.Moment, interval: Number): Promise<any>;
    getLastLog(interval: Number, limit: Number): Promise<{}>;
    getStatisticalData(start: moment.Moment, end: moment.Moment): Promise<any>;
    private sensorsLoggingRoutine;
}
declare const _default: SensorLogger;
export default _default;
