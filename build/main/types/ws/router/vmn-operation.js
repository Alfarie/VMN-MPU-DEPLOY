"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const store_1 = __importDefault(require("../../store"));
const operation_1 = require("../../store/operation");
const { getState, dispatch } = store_1.default;
class AuthRouter extends router_1.Router {
    constructor() {
        super();
        this.router = express_1.default.Router();
        this.mountRoute();
    }
    mountRoute() {
        this.router.post('/', (req, res) => {
            const { body } = req;
            dispatch(operation_1.setOperation(body));
            res.json({ msg: 'success' });
        });
        this.router.get('/', ({}, res) => {
            res.json(getState().operation);
        });
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm1uLW9wZXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy9yb3V0ZXIvdm1uLW9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUE2QjtBQUM3QixxQ0FBK0I7QUFFL0Isd0RBQStCO0FBQy9CLHFEQUFrRDtBQUVsRCxNQUFNLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxHQUFHLGVBQUssQ0FBQztBQUVuQyxNQUFxQixVQUFXLFNBQVEsZUFBTTtJQUUxQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU8sVUFBVTtRQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUUsRUFBRTtZQUM5QixNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ25CLFFBQVEsQ0FBQyx3QkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFBO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFO1lBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDbEMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUFsQkQsNkJBa0JDIn0=