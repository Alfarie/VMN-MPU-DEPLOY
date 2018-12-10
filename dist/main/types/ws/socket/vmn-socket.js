"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
const store_1 = __importDefault(require("../../store"));
// import {setNodes} from '../../store/nodes'
// import moment from 'moment'
// function getRndInteger(min, max) {
//     return Math.floor(Math.random() * (max - min) ) + min;
//   }
// function getRndFloat(min, max) {
//     return (Math.random() * (max - min) ) + min;
//   }
// const genNodes = () => {
//     return {
//         supply: getRndFloat(1.8, 2),
//         nodes: [
//             { ec: getRndFloat(1.8, 2), volume: getRndInteger(400,420)},
//             { ec: getRndFloat(1.8, 2), volume: getRndInteger(400,420)},
//             { ec: getRndFloat(1.8, 2), volume: getRndInteger(400,420)},
//             { ec: getRndFloat(1.8, 2), volume: getRndInteger(400,420)},
//             { ec: getRndFloat(1.8, 2), volume: getRndInteger(400,420)},
//             { ec: getRndFloat(1.8, 2), volume: getRndInteger(400,420)},
//             { ec: getRndFloat(1.8, 2), volume: getRndInteger(400,420)},
//             { ec: getRndFloat(1.8, 2), volume: getRndInteger(400,420)}
//         ],
//         datetime: moment().format('YYYY-MM-DD HH:mm:ss')
//     }
// }
class VmnSocket extends socket_1.SocketHandler {
    constructor(IO) {
        super(IO);
    }
    publishStatus() {
        setInterval(() => {
            // store.dispatch(setNodes(genNodes()))
            this.io.to('0x01').emit('action', store_1.default.getState().nodes);
        }, 1000);
    }
}
exports.VmnSocket = VmnSocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm1uLXNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy9zb2NrZXQvdm1uLXNvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFzQztBQUN0Qyx3REFBK0I7QUFFL0IsNkNBQTZDO0FBQzdDLDhCQUE4QjtBQUU5QixxQ0FBcUM7QUFDckMsNkRBQTZEO0FBQzdELE1BQU07QUFDTixtQ0FBbUM7QUFDbkMsbURBQW1EO0FBQ25ELE1BQU07QUFDTiwyQkFBMkI7QUFDM0IsZUFBZTtBQUNmLHVDQUF1QztBQUN2QyxtQkFBbUI7QUFDbkIsMEVBQTBFO0FBQzFFLDBFQUEwRTtBQUMxRSwwRUFBMEU7QUFDMUUsMEVBQTBFO0FBQzFFLDBFQUEwRTtBQUMxRSwwRUFBMEU7QUFDMUUsMEVBQTBFO0FBQzFFLHlFQUF5RTtBQUN6RSxhQUFhO0FBQ2IsMkRBQTJEO0FBQzNELFFBQVE7QUFDUixJQUFJO0FBRUosTUFBYSxTQUFVLFNBQVEsc0JBQWE7SUFDeEMsWUFBWSxFQUFNO1FBQ2QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVTLGFBQWE7UUFDbkIsV0FBVyxDQUFDLEdBQUUsRUFBRTtZQUNaLHVDQUF1QztZQUN2QyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDWixDQUFDO0NBQ0o7QUFYRCw4QkFXQyJ9