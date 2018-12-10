import Logger from './logger';
import moment from 'moment';
declare class VmnLogger extends Logger {
    static instance: VmnLogger;
    private currentTime;
    static getInstance(): VmnLogger;
    constructor();
    log(data: any): void;
    getLog(start: moment.Moment, end: moment.Moment, interval: Number): Promise<any>;
    createTable(): void;
    private vmnLoggingRoutine;
}
declare const _default: VmnLogger;
export default _default;
