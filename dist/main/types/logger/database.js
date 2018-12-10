"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite = __importStar(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sqlite3 = sqlite.verbose();
class Database {
    constructor() {
        this.dbDir = path_1.default.join(path_1.default.resolve(__dirname, '../../../../DB'));
        this.dbPath = this.dbDir + '/db.db';
        if (!fs_1.default.existsSync(this.dbDir)) {
            fs_1.default.mkdirSync(this.dbDir);
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
exports.default = Database;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvbG9nZ2VyL2RhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdEQUFpQztBQUNqQyxnREFBdUI7QUFDdkIsNENBQW1CO0FBQ25CLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUVoQyxNQUFxQixRQUFRO0lBSXpCO1FBSEEsVUFBSyxHQUFXLGNBQUksQ0FBQyxJQUFJLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLFdBQU0sR0FBVyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUduQyxJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUM7WUFDM0IsWUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFXO1FBQ3pCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQixJQUFJLEdBQUc7b0JBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQzNCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFVLEVBQUUsTUFBYTtRQUM3QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxHQUFHLEVBQUM7b0JBQ0osTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUNkO2dCQUFBLENBQUM7Z0JBQ0YsT0FBTyxFQUFFLENBQUE7WUFDYixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLEtBQUs7UUFDUixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVPLE9BQU87UUFDWCxJQUFJLEVBQUUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBdkNELDJCQXVDQyJ9