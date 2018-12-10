import AWSIOT from './aws-iot';
export default class AWSTransmitter {
    awsIot: AWSIOT;
    constructor(iot: AWSIOT);
    private publicDeviceStatus;
    private publicDeviceLogging;
    updateShadowControl(): void;
}
