import awsIot from 'aws-iot-device-sdk';
import GetMac from './getmac';
import Configuration from '../configuration';
import path from 'path';
import AWSTransmitter from './aws-transmiter';
import AWSReciever from './aws-reciever';
import * as Rx from 'rxjs';
export default class AWSIOT {
    constructor() {
        this.certPath = path.join(path.resolve(__dirname, '../../../../'));
        console.log("cert path: " + this.certPath);
        this.init();
        this.awsTransmitter = new AWSTransmitter(this);
        this.awsReciever = new AWSReciever(this);
    }
    async init() {
        this.onDeviceStatus = new Rx.Subject();
        this.onShadowDelta = new Rx.Subject();
        this.mid = await GetMac.getMac(Configuration.getConfig().interface);
        console.log(this.mid);
        this.thingName = this.mid;
        const clientId = this.mid;
        var lwt_payload = {
            connection: false,
            mid: this.thingName
        };
        var cert_shadow = {
            keyPath: this.certPath + '/cert/private.pem.key',
            certPath: this.certPath + '/cert/certificate.pem.crt',
            caPath: this.certPath + '/cert/root-CA.crt',
            host: 'a36i6p8e4cz1dq.iot.ap-southeast-1.amazonaws.com',
            clientId: '12345678910'
        };
        var cert_device = {
            keyPath: this.certPath + '/cert/private.pem.key',
            certPath: this.certPath + '/cert/certificate.pem.crt',
            caPath: this.certPath + '/cert/root-CA.crt',
            host: 'a36i6p8e4cz1dq.iot.ap-southeast-1.amazonaws.com',
            clientId: '12345678911',
            will: {
                topic: 'LWT_UPDATE',
                payload: JSON.stringify(lwt_payload)
            }
        };
        cert_device['clientId'] = clientId + '-device';
        cert_shadow['clientId'] = clientId + '-shadow';
        this.device = awsIot.device(cert_device);
        this.shadow = awsIot.thingShadow(cert_shadow);
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
    }
    publish(topic, jsonMsg) {
        this.device.publish(topic, JSON.stringify(jsonMsg));
    }
    subscribe(topic, {}) {
        console.log('[INFO] AWS Subscribe ' + topic);
        this.device.subscribe(topic);
    }
    updateThingShadow(data) {
        var state = { state: { reported: data, desired: null } };
        const clientTokenUpdate = this.shadow.update(this.thingName, state);
        if (clientTokenUpdate === null) {
            console.log('[Error] update shadow failed, operation still in progress');
        }
        else {
            console.log('[Info] update shadow successful');
        }
    }
    clearDesired() {
        var state = { state: { desired: null } };
        const clientTokenUpdate = this.shadow.update(this.thingName, state);
        if (clientTokenUpdate === null) {
            console.log('[Error] update shadow failed, operation still in progress');
        }
        else {
            console.log('[Info] update shadow successful');
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWlvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlcy9hd3MvYXdzLWlvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxvQkFBb0IsQ0FBQTtBQUN2QyxPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFDOUIsT0FBTyxhQUFhLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQ3ZCLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFBO0FBQzdDLE9BQU8sV0FBVyxNQUFNLGdCQUFnQixDQUFBO0FBQ3hDLE9BQU8sS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFBO0FBQzFCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTTtJQVV2QjtRQURBLGFBQVEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNYLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBRU8sS0FBSyxDQUFDLElBQUk7UUFDZCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMs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