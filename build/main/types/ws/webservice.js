"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http = __importStar(require("http"));
const path_1 = __importDefault(require("path"));
const express_json_csv_1 = __importDefault(require("express-json-csv"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const controlRouter_1 = __importDefault(require("./router/controlRouter"));
const loggerRouter_1 = __importDefault(require("./router/loggerRouter"));
const wifiRouter_1 = __importDefault(require("./router/wifiRouter"));
const settingRouter_1 = __importDefault(require("./router/settingRouter"));
const vmn_operation_1 = __importDefault(require("./router/vmn-operation"));
const vmnLoggerRouter_1 = __importDefault(require("./router/vmnLoggerRouter"));
var app = express_1.default();
var secret = 'ThisIsSecretMessageIntelAgro';
app.set('superSecret', secret);
var cors = require('cors');
app.use(cors());
express_json_csv_1.default(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
var root = path_1.default.join(path_1.default.resolve(__dirname, '../../../../dist/'));
app.use(express_1.default.static(root));
class WebService {
    constructor() {
        this.port = 3000;
        this.mountRoute();
        this.http = new http.Server(app);
        this.io = socket_io_1.default(this.http);
        this.http.listen(this.port, (err) => {
            if (err)
                console.log(err);
            console.log('[Info] Listening on port:', this.port);
        });
    }
    getIO() {
        return this.io;
    }
    mountRoute() {
        const authRouter = new authRouter_1.default();
        const controlRouter = new controlRouter_1.default();
        const loggerRouter = new loggerRouter_1.default();
        const wifiRouter = new wifiRouter_1.default();
        const settingRouter = new settingRouter_1.default();
        const vmnOperationRouter = new vmn_operation_1.default();
        const vmnLoggerRouter = new vmnLoggerRouter_1.default();
        app.use('/auth', authRouter.getRouter());
        app.use('/control', controlRouter.getRouter());
        app.use('/logger', loggerRouter.getRouter());
        app.use('/vmn-logger', vmnLoggerRouter.getRouter());
        app.use('/wifi', wifiRouter.getRouter());
        app.use('/setting', settingRouter.getRouter());
        app.use('/operation', vmnOperationRouter.getRouter());
    }
}
exports.WebService = WebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy93ZWJzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4QjtBQUc5QiwwREFBZ0M7QUFDaEMsMkNBQTRCO0FBQzVCLGdEQUF1QjtBQUN2Qix3RUFBc0M7QUFDdEMscUVBQTRDO0FBQzVDLDJFQUFrRDtBQUNsRCx5RUFBZ0Q7QUFDaEQscUVBQTRDO0FBQzVDLDJFQUFrRDtBQUNsRCwyRUFBdUQ7QUFDdkQsK0VBQXNEO0FBRXRELElBQUksR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQTtBQUNuQixJQUFJLE1BQU0sR0FBRyw4QkFBOEIsQ0FBQTtBQUMzQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUU5QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hCLDBCQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDWixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDO0lBQ3ZCLFFBQVEsRUFBRSxJQUFJO0NBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBRUosSUFBSSxJQUFJLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7QUFDbkUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBRzlCLE1BQWEsVUFBVTtJQUluQjtRQUhBLFNBQUksR0FBVSxJQUFJLENBQUE7UUFJZCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxtQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUc3QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUU7WUFDaEMsSUFBRyxHQUFHO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sS0FBSztRQUNSLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBRU8sVUFBVTtRQUNkLE1BQU0sVUFBVSxHQUFHLElBQUksb0JBQVUsRUFBRSxDQUFBO1FBQ25DLE1BQU0sYUFBYSxHQUFHLElBQUksdUJBQWEsRUFBRSxDQUFBO1FBQ3pDLE1BQU0sWUFBWSxHQUFHLElBQUksc0JBQVksRUFBRSxDQUFBO1FBQ3ZDLE1BQU0sVUFBVSxHQUFHLElBQUksb0JBQVUsRUFBRSxDQUFBO1FBQ25DLE1BQU0sYUFBYSxHQUFJLElBQUksdUJBQWEsRUFBRSxDQUFBO1FBQzFDLE1BQU0sa0JBQWtCLEdBQUksSUFBSSx1QkFBa0IsRUFBRSxDQUFBO1FBQ3BELE1BQU0sZUFBZSxHQUFJLElBQUkseUJBQWUsRUFBRSxDQUFBO1FBQzlDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNKO0FBckNELGdDQXFDQyJ9