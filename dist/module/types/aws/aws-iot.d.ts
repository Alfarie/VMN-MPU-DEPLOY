import AWSTransmitter from './aws-transmiter';
import AWSReciever from './aws-reciever';
import * as Rx from 'rxjs';
export default class AWSIOT {
    mid: String;
    device: any;
    shadow: any;
    thingName: String;
    awsTransmitter: AWSTransmitter;
    awsReciever: AWSReciever;
    onDeviceStatus: Rx.Subject<any>;
    onShadowDelta: Rx.Subject<any>;
    certPath: String;
    constructor();
    private init;
    publish(topic: any, jsonMsg: any): void;
    subscribe(topic: any, {}: {}): void;
    updateThingShadow(data: any): void;
    clearDesired(): void;
}
