import express from 'express';
import { Router } from './router';
import { JWTHandler } from '../jwt';
export default class AuthRouter extends Router {
    constructor() {
        super();
        this.name = '/auth/';
        this.authData = {
            "username": "grobot-vmn@agrointelligence.com",
            "password": "raspberry"
        };
        this.jwtHandler = new JWTHandler();
        this.router = express.Router();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy9yb3V0ZXIvYXV0aFJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUE7QUFDN0IsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQTtBQUMvQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLE1BQU07SUFJMUM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixVQUFVLEVBQUUsaUNBQWlDO1lBQzdDLFVBQVUsRUFBRSxXQUFXO1NBQzFCLENBQUE7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUE7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFHTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3BDOzs7OztjQUtFO1lBQ0gsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFDO2dCQUM3RSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNMLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7b0JBQ2hDLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsMkJBQTJCO29CQUNwQyxPQUFPLEVBQUUsSUFBSTtvQkFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTO2lCQUN2QyxDQUFDLENBQUE7YUFDTjtpQkFBSTtnQkFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDakIsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsT0FBTyxFQUFFLHFCQUFxQjtpQkFDakMsQ0FBQyxDQUFBO2FBQ0w7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9