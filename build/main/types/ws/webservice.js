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
const presetRouter_1 = __importDefault(require("./router/presetRouter"));
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
        const presetRouter = new presetRouter_1.default();
        app.use('/auth', authRouter.getRouter());
        app.use('/control', controlRouter.getRouter());
        app.use('/logger', loggerRouter.getRouter());
        app.use('/vmn-logger', vmnLoggerRouter.getRouter());
        app.use('/wifi', wifiRouter.getRouter());
        app.use('/setting', settingRouter.getRouter());
        app.use('/operation', vmnOperationRouter.getRouter());
        app.use('/preset', presetRouter.getRouter());
    }
}
exports.WebService = WebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy93ZWJzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4QjtBQUc5QiwwREFBZ0M7QUFDaEMsMkNBQTRCO0FBQzVCLGdEQUF1QjtBQUN2Qix3RUFBc0M7QUFDdEMscUVBQTRDO0FBQzVDLDJFQUFrRDtBQUNsRCx5RUFBZ0Q7QUFDaEQscUVBQTRDO0FBQzVDLDJFQUFrRDtBQUNsRCwyRUFBdUQ7QUFDdkQsK0VBQXNEO0FBQ3RELHlFQUFnRDtBQUVoRCxJQUFJLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUE7QUFDbkIsSUFBSSxNQUFNLEdBQUcsOEJBQThCLENBQUE7QUFDM0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFFOUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNoQiwwQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ1osSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ3ZDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQztJQUN2QixRQUFRLEVBQUUsSUFBSTtDQUNqQixDQUFDLENBQUMsQ0FBQztBQUVKLElBQUksSUFBSSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0FBQ25FLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUc5QixNQUFhLFVBQVU7SUFJbkI7UUFIQSxTQUFJLEdBQVUsSUFBSSxDQUFBO1FBSWQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxFQUFFLEdBQUcsbUJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFHN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFFO1lBQ2hDLElBQUcsR0FBRztnQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RELENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLEtBQUs7UUFDUixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUVPLFVBQVU7UUFDZCxNQUFNLFVBQVUsR0FBRyxJQUFJLG9CQUFVLEVBQUUsQ0FBQTtRQUNuQyxNQUFNLGFBQWEsR0FBRyxJQUFJLHVCQUFhLEVBQUUsQ0FBQTtRQUN6QyxNQUFNLFlBQVksR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQTtRQUN2QyxNQUFNLFVBQVUsR0FBRyxJQUFJLG9CQUFVLEVBQUUsQ0FBQTtRQUNuQyxNQUFNLGFBQWEsR0FBSSxJQUFJLHVCQUFhLEVBQUUsQ0FBQTtRQUMxQyxNQUFNLGtCQUFrQixHQUFJLElBQUksdUJBQWtCLEVBQUUsQ0FBQTtRQUNwRCxNQUFNLGVBQWUsR0FBSSxJQUFJLHlCQUFlLEVBQUUsQ0FBQTtRQUM5QyxNQUFNLFlBQVksR0FBSSxJQUFJLHNCQUFZLEVBQUUsQ0FBQTtRQUN4QyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDSjtBQXZDRCxnQ0F1Q0MifQ==