import { SocketHandler } from './socket';
import store from '../../store';
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
export class VmnSocket extends SocketHandler {
    constructor(IO) {
        super(IO);
    }
    publishStatus() {
        setInterval(() => {
            // store.dispatch(setNodes(genNodes()))
            this.io.to('0x01').emit('action', store.getState().nodes);
        }, 1000);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm1uLXNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy93cy9zb2NrZXQvdm1uLXNvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sVUFBVSxDQUFBO0FBQ3RDLE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQTtBQUUvQiw2Q0FBNkM7QUFDN0MsOEJBQThCO0FBRTlCLHFDQUFxQztBQUNyQyw2REFBNkQ7QUFDN0QsTUFBTTtBQUNOLG1DQUFtQztBQUNuQyxtREFBbUQ7QUFDbkQsTUFBTTtBQUNOLDJCQUEyQjtBQUMzQixlQUFlO0FBQ2YsdUNBQXVDO0FBQ3ZDLG1CQUFtQjtBQUNuQiwwRUFBMEU7QUFDMUUsMEVBQTBFO0FBQzFFLDBFQUEwRTtBQUMxRSwwRUFBMEU7QUFDMUUsMEVBQTBFO0FBQzFFLDBFQUEwRTtBQUMxRSwwRUFBMEU7QUFDMUUseUVBQXlFO0FBQ3pFLGFBQWE7QUFDYiwyREFBMkQ7QUFDM0QsUUFBUTtBQUNSLElBQUk7QUFFSixNQUFNLE9BQU8sU0FBVSxTQUFRLGFBQWE7SUFDeEMsWUFBWSxFQUFNO1FBQ2QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVTLGFBQWE7UUFDbkIsV0FBVyxDQUFDLEdBQUUsRUFBRTtZQUNaLHVDQUF1QztZQUN2QyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDWixDQUFDO0NBQ0oifQ==