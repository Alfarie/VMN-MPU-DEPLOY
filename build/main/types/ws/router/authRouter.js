"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const jwt_1 = require("../jwt");
class AuthRouter extends router_1.Router {
    constructor() {
        super();
        this.name = '/auth/';
        this.authData = {
            "username": "admin@mediatec.org",
            "password": "123123"
        };
        this.jwtHandler = new jwt_1.JWTHandler();
        this.router = express_1.default.Router();
        this.mountRoute();
    }
    mountRoute() {
        this.router.post('/signin', (req, res) => {
            /*
                {
                    username: ....,
                    password: ....
                }
            */
            var ad = req.body;
            console.log(ad);
            if (this.authData.username == ad.username && this.authData.password == ad.password) {
                var tokenId = this.jwtHandler.sign(this.authData);
                console.log(this.authData);
                res.json({
                    username: this.authData.username,
                    tokenId: tokenId,
                    message: 'Authentication Successful',
                    success: true,
                    expiresIn: this.jwtHandler.expiresIn
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    message: 'Authentication Fail'
                });
            }
        });
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy9yb3V0ZXIvYXV0aFJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUE2QjtBQUM3QixxQ0FBK0I7QUFDL0IsZ0NBQW9DO0FBQ3BDLE1BQXFCLFVBQVcsU0FBUSxlQUFNO0lBSTFDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQTtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osVUFBVSxFQUFFLG9CQUFvQjtZQUNoQyxVQUFVLEVBQUUsUUFBUTtTQUN2QixDQUFBO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGdCQUFVLEVBQUUsQ0FBQTtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFHTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3BDOzs7OztjQUtFO1lBQ0gsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFDO2dCQUM3RSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNMLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7b0JBQ2hDLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsMkJBQTJCO29CQUNwQyxPQUFPLEVBQUUsSUFBSTtvQkFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTO2lCQUN2QyxDQUFDLENBQUE7YUFDTjtpQkFBSTtnQkFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDakIsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsT0FBTyxFQUFFLHFCQUFxQjtpQkFDakMsQ0FBQyxDQUFBO2FBQ0w7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTdDRCw2QkE2Q0MifQ==