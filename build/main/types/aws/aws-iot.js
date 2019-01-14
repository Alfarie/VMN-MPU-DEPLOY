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
const aws_iot_device_sdk_1 = __importDefault(require("aws-iot-device-sdk"));
const aws_transmiter_1 = __importDefault(require("./aws-transmiter"));
const aws_reciever_1 = __importDefault(require("./aws-reciever"));
const configuration_1 = __importDefault(require("../configuration"));
const Rx = __importStar(require("rxjs"));
const getmac_1 = __importDefault(require("./getmac"));
const path_1 = __importDefault(require("path"));
class AWSIOT {
    constructor() {
        this.certPath = path_1.default.join(path_1.default.resolve(__dirname, '../../../../'));
        this.publish = (topic, jsonMsg) => {
            this.device.publish(topic, JSON.stringify(jsonMsg));
        };
        this.subscribe = (topic, {}) => {
            console.log('[INFO] AWS Subscribe ' + topic);
            this.device.subscribe(topic);
        };
        this.updateThingShadow = (data) => {
            const state = { state: { reported: data, desired: null } };
            const clientTokenUpdate = this.shadow.update(this.thingName, state);
            if (clientTokenUpdate === null) {
                console.log('[Error] update shadow failed, operation still in progress');
            }
            else {
                console.log('[Info] update shadow successful');
            }
        };
        this.clearDesired = () => {
            const state = { state: { desired: null } };
            const clientTokenUpdate = this.shadow.update(this.thingName, state);
            if (clientTokenUpdate === null) {
                console.log('[Error] update shadow failed, operation still in progress');
            }
            else {
                console.log('[Info] update shadow successful');
            }
        };
        this.init = async () => {
            this.onDeviceStatus = new Rx.Subject();
            this.onShadowDelta = new Rx.Subject();
            this.mid = await getmac_1.default.getMac(configuration_1.default.getConfig().interface);
            console.log(this.mid);
            this.thingName = this.mid;
            const clientId = this.mid;
            const lwtPayload = {
                connection: false,
                mid: this.thingName
            };
            const certShadow = {
                caPath: this.certPath + '/cert/root-CA.crt',
                certPath: this.certPath + '/cert/certificate.pem.crt',
                clientId: '12345678910',
                host: 'a36i6p8e4cz1dq.iot.ap-southeast-1.amazonaws.com',
                keyPath: this.certPath + '/cert/private.pem.key',
            };
            const certDevice = {
                caPath: this.certPath + '/cert/root-CA.crt',
                certPath: this.certPath + '/cert/certificate.pem.crt',
                clientId: '12345678911',
                host: 'a36i6p8e4cz1dq.iot.ap-southeast-1.amazonaws.com',
                keyPath: this.certPath + '/cert/private.pem.key',
                will: {
                    payload: JSON.stringify(lwtPayload),
                    topic: 'LWT_UPDATE'
                }
            };
            certDevice.clientId = clientId + '-device';
            certShadow.clientId = clientId + '-shadow';
            this.device = aws_iot_device_sdk_1.default.device(certDevice);
            this.shadow = aws_iot_device_sdk_1.default.thingShadow(certShadow);
            this.shadow.on('connect', () => {
                console.log('[Info] AWS-IoT Shadow CONNECTED');
                this.shadow.register(this.thingName, {}, () => {
                    console.log('[Info] Thing Registered');
                    this.onDeviceStatus.next({ topic: 'shadow', message: 'connected' });
                });
            });
            // this.shadow.on('status', (thingName, stat, clientToken, stateObject) => {
            //     // console.log('received ' + stat + ' on ' + thingName + ': ' +
            //     //     JSON.stringify(stateObject.state.reported));
            // });
            this.shadow.on('error', (error) => {
                console.log(error);
            });
            this.shadow.on('delta', (thingName, stateObject) => {
                // console.log('received delta on ' + thingName + ': ' +
                //     JSON.stringify(stateObject.state));
                // var state = stateObject.state // desired 
                // onDelta.next(stateObject)
                console.log('[Info] Recieved deltal on ' + thingName);
                this.onShadowDelta.next(stateObject);
            });
            this.device.on('connect', () => {
                console.log('[Info] AWS-IoT CONNECTED');
                this.publish('UPDATE_DEVICE', { mid: this.mid, updateDevice: new Date() });
                this.onDeviceStatus.next({ topic: 'device', message: 'connected' });
            });
            this.device.on('close', () => console.log('[Info] AWS-IoT CLOSED'));
            this.device.on('reconnect', () => console.log('[Info] AWS-IoT RECONNECT'));
            this.device.on('offline', () => console.log('[Info] AWS-IoT OFFLINE'));
            this.device.on('error', (error) => console.log('[Info] AWS-IoT ERROR', error));
            this.device.on('message', (topic, payload) => {
                console.log('message', topic, payload.toString());
            });
        };
        console.log("cert path: " + this.certPath);
        this.init();
        this.awsTransmitter = new aws_transmiter_1.default(this);
        this.awsReciever = new aws_reciever_1.default(this);
    }
}
exports.default = AWSIOT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWlvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy9hd3MvYXdzLWlvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw0RUFBdUM7QUFDdkMsc0VBQTZDO0FBQzdDLGtFQUF3QztBQUN4QyxxRUFBNkM7QUFDN0MseUNBQTBCO0FBQzFCLHNEQUE4QjtBQUM5QixnREFBdUI7QUFFdkIsTUFBcUIsTUFBTTtJQVd2QjtRQUZRLGFBQVEsR0FBVyxjQUFJLENBQUMsSUFBSSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFTdkUsWUFBTyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFBO1FBRU0sY0FBUyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFBO1FBRU0sc0JBQWlCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoQyxNQUFNLEtBQUssR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7WUFDM0QsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BFLElBQUksaUJBQWlCLEtBQUssSUFBSSxFQUFFO2dCQUM1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