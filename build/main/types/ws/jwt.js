"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTHandler {
    constructor() {
        this.secret = 'ThisIsSecretMessageIntelAgro';
        this.expiresIn = 3600;
    }
    sign(payload) {
        var tokenId = jsonwebtoken_1.default.sign(payload, this.secret, {
            expiresIn: this.expiresIn
        });
        return tokenId;
    }
    async verify(tokenId) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(tokenId, this.secret, function (err, decoded) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
    setSecret(secret) {
        this.secret = secret;
    }
    setExpiresIn(expiresIn) {
        this.expiresIn = expiresIn;
    }
}
exports.JWTHandler = JWTHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL3dzL2p3dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdFQUE4QjtBQUU5QixNQUFhLFVBQVU7SUFBdkI7UUFDVyxXQUFNLEdBQVUsOEJBQThCLENBQUE7UUFDOUMsY0FBUyxHQUFZLElBQUksQ0FBQztJQTRCckMsQ0FBQztJQTFCVSxJQUFJLENBQUMsT0FBTztRQUNmLElBQUksT0FBTyxHQUFHLHNCQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFHO1lBQzFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUM1QixDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLEVBQUU7WUFDbkMsc0JBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBUyxHQUFHLEVBQUUsT0FBTztnQkFDbEQsSUFBRyxHQUFHLEVBQUM7b0JBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNmO3FCQUNHO29CQUNBLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDcEI7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUNNLFNBQVMsQ0FBQyxNQUFhO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFDTSxZQUFZLENBQUMsU0FBZ0I7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7SUFDOUIsQ0FBQztDQUNKO0FBOUJELGdDQThCQyJ9