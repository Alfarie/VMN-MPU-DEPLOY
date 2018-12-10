import jwt from 'jsonwebtoken';
export class JWTHandler {
    constructor() {
        this.secret = 'ThisIsSecretMessageIntelAgro';
        this.expiresIn = 3600;
    }
    sign(payload) {
        var tokenId = jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn
        });
        return tokenId;
    }
    async verify(tokenId) {
        return new Promise((resolve, reject) => {
            jwt.verify(tokenId, this.secret, function (err, decoded) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL3dzL2p3dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxjQUFjLENBQUE7QUFFOUIsTUFBTSxPQUFPLFVBQVU7SUFBdkI7UUFDVyxXQUFNLEdBQVUsOEJBQThCLENBQUE7UUFDOUMsY0FBUyxHQUFZLElBQUksQ0FBQztJQTRCckMsQ0FBQztJQTFCVSxJQUFJLENBQUMsT0FBTztRQUNmLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUc7WUFDMUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzVCLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU87UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsRUFBRTtZQUNuQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVMsR0FBRyxFQUFFLE9BQU87Z0JBQ2xELElBQUcsR0FBRyxFQUFDO29CQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZjtxQkFDRztvQkFDQSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3BCO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFDTSxTQUFTLENBQUMsTUFBYTtRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBQ00sWUFBWSxDQUFDLFNBQWdCO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0lBQzlCLENBQUM7Q0FDSiJ9