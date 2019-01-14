import awsIot from 'aws-iot-device-sdk';
import AWSTransmitter from './aws-transmiter';
import AWSReciever from './aws-reciever';
import Configuration from '../configuration';
import * as Rx from 'rxjs';
import GetMac from './getmac';
import path from 'path';
export default class AWSIOT {
    constructor() {
        this.certPath = path.join(path.resolve(__dirname, '../../../../'));
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
            this.mid = await GetMac.getMac(Configuration.getConfig().interface);
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
            this.device = awsIot.device(certDevice);
            this.shadow = awsIot.thingShadow(certShadow);
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
        this.awsTransmitter = new AWSTransmitter(this);
        this.awsReciever = new AWSReciever(this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWlvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy9hd3MvYXdzLWlvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLE1BQU0sTUFBTSxvQkFBb0IsQ0FBQTtBQUN2QyxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQTtBQUM3QyxPQUFPLFdBQVcsTUFBTSxnQkFBZ0IsQ0FBQTtBQUN4QyxPQUFPLGFBQWEsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxPQUFPLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQTtBQUMxQixPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFDOUIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBRXZCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTTtJQVd2QjtRQUZRLGFBQVEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFTdkUsWUFBTyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFBO1FBRU0sY0FBUyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFBO1FBRU0sc0JBQWlCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoQyxNQUFNLEtBQUssR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUks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