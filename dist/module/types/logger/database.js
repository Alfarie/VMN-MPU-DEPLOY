import * as sqlite from 'sqlite3';
import path from 'path';
import fs from 'fs';
const sqlite3 = sqlite.verbose();
export default class Database {
    constructor() {
        this.dbDir = path.join(path.resolve(__dirname, '../../../../DB'));
        this.dbPath = this.dbDir + '/db.db';
        if (!fs.existsSync(this.dbDir)) {
            fs.mkdirSync(this.dbDir);
        }
        this.db = this.connect();
    }
    async exec(data) {
        return new Promise((resolve, reject) => {
            this.db.run(data, err => {
                if (err)
                    reject(err.message);
                resolve('Exec success');
            });
        });
    }
    async execParams(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    reject(err);
                }
                ;
                resolve();
            });
        });
    }
    getDB() {
        return this.db;
    }
    connect() {
        var db = new sqlite3.Database(this.dbPath);
        return db;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvbG9nZ2VyL2RhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFBO0FBQ2pDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQTtBQUN2QixPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUE7QUFDbkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBRWhDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUTtJQUl6QjtRQUhBLFVBQUssR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUNyRSxXQUFNLEdBQVcsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7UUFHbkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDO1lBQzNCLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBVztRQUN6QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxHQUFHO29CQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUMzQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBVSxFQUFFLE1BQWE7UUFDN0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksR0FBRyxFQUFDO29CQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDZDtnQkFBQSxDQUFDO2dCQUNGLE9BQU8sRUFBRSxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSxLQUFLO1FBQ1IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTyxPQUFPO1FBQ1gsSUFBSSxFQUFFLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSiJ9