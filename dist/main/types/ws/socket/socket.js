"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const device_1 = __importDefault(require("../../device/device"));
class SocketHandler {
    constructor(IO) {
        this.io = IO;
        this.declarePublisher();
        this.publishStatus();
    }
    declarePublisher() {
        this.io.on('connection', function (socket) {
            console.log("[socket] Client Connected");
            socket.join('0x01');
            socket.on('disconnect', function () {
                console.log('[socket] DISCONNECT');
            });
        });
    }
    publishStatus() {
        setInterval(() => {
            if (!device_1.default.isDeviceAvailable()) {
                return;
            }
            try {
                var deviceStatus = device_1.default.getDeviceData().status;
                const data = {
                    sensors: deviceStatus.sensors,
                    datetime: moment_1.default(deviceStatus.datetime.date + ' ' + deviceStatus.datetime.time).format('YYYY-MM-DD HH:mm:ss'),
                    paracc: deviceStatus.paracc,
                    gpio: deviceStatus.gpio
                };
                // console.log(data);
                this.io.to('0x01').emit('DEVICE_DATA', data);
            }
            catch (err) {
                console.log(err);
            }
        }, 1000);
    }
}
exports.SocketHandler = SocketHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3R5cGVzL3dzL3NvY2tldC9zb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBMkI7QUFDM0IsaUVBQStDO0FBQy9DLE1BQWEsYUFBYTtJQUV0QixZQUFZLEVBQU07UUFDZCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sZ0JBQWdCO1FBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLE1BQU07WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLGFBQWE7UUFDbkIsV0FBVyxDQUFFLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxnQkFBYSxDQUFDLGlCQUFpQixFQUFFLEVBQUM7Z0JBQ25DLE9BQVE7YUFDWDtZQUNELElBQUk7Z0JBQ0EsSUFBSSxZQUFZLEdBQUcsZ0JBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUE7Z0JBQ3ZELE1BQU0sSUFBSSxHQUFJO29CQUNWLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTztvQkFDN0IsUUFBUSxFQUFFLGdCQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO29CQUM5RyxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU07b0JBQzNCLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTtpQkFDMUIsQ0FBQTtnQkFDRCxxQkFBcUI7Z0JBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDaEQ7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ2xCO1FBQ0wsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBRVgsQ0FBQztDQUNKO0FBdkNELHNDQXVDQyJ9