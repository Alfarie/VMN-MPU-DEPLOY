import AWSTransmitter from './aws-transmiter';
import AWSReciever from './aws-reciever';
import * as Rx from 'rxjs';
export default class AWSIOT {
    mid: string;
    awsReciever: AWSReciever;
    awsTransmitter: AWSTransmitter;
    thingName: string;
    onDeviceStatus: Rx.Subject<any>;
    onShadowDelta: Rx.Subject<any>;
    private device;
    private shadow;
    private certPath;
    constructor();
    publish: (topic: any, jsonMsg: any) => void;
    subscribe: (topic: any, {}: {}) => void;
    updateThingShadow: (data: any) => void;
    clearDesired: () => void;
    private init;
}
