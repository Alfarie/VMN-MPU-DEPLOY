declare class GetMac {
    static getMac: GetMac;
    static getInstance(): GetMac;
    mac: string;
    constructor();
    getMac(iface: String): any;
}
declare const _default: GetMac;
export default _default;
