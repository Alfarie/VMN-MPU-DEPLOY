import DataBase from './database';
export default abstract class Logger {
    db: DataBase;
    constructor();
    abstract log(json: any): void;
    abstract createTable(): void;
}
