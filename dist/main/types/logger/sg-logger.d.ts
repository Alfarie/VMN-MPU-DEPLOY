import Logger from './logger';
declare class SGLogger extends Logger {
    static instance: SGLogger;
    static getInstance(): SGLogger;
    constructor();
    log(data: any): void;
    createTable(): void;
}
declare const _default: SGLogger;
export default _default;
