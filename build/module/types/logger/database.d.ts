export default class Database {
    dbDir: string;
    dbPath: string;
    db: any;
    constructor();
    exec(data: string): Promise<{}>;
    execParams(sql: string, params: any[]): Promise<{}>;
    getDB(): any;
    private connect;
}
