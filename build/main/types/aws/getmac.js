"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getmac_1 = __importDefault(require("getmac"));
class GetMac {
    static getInstance() {
        if (this.getMac == undefined) {
            this.getMac = new GetMac();
        }
        return this.getMac;
    }
    constructor() {
    }
    getMac(iface) {
        return new Promise((resolve, reject) => {
            getmac_1.default.getMac({ iface: iface }, (err, macAddress) => {
                if (err)
                    reject(err);
                this.mac = macAddress.split(":").join('');
                resolve(macAddress.split(":").join(''));
            });
        });
    }
}
exports.default = GetMac.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0bWFjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2F3cy9nZXRtYWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBMkI7QUFFM0IsTUFBTSxNQUFNO0lBRUQsTUFBTSxDQUFDLFdBQVc7UUFDckIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUE7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDdEIsQ0FBQztJQUVEO0lBRUEsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFZO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUU7Z0JBQ2pELElBQUksR0FBRztvQkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ3pDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUFDRCxrQkFBZSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUEifQ==