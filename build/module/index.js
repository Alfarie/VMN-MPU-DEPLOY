import { WebService } from './types/ws/webservice';
import { VmnSocket } from './types/ws/socket/vmn-socket';
const ws = new WebService();
new VmnSocket(ws.getIO());
import AWSManager from './types/aws/aws';
new AWSManager();
import DeviceIO from './types/device-io/device';
new DeviceIO();
// import { InitVmnLogger } from './types/simulation/generate-sensors-logger'
// InitVmnLogger()
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxNQUFNLEVBQUUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFBO0FBQzNCLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0FBQ3pCLE9BQU8sVUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLElBQUksVUFBVSxFQUFFLENBQUE7QUFFaEIsT0FBTyxRQUFRLE1BQU0sMEJBQTBCLENBQUE7QUFDL0MsSUFBSSxRQUFRLEVBQUUsQ0FBQztBQUdmLDZFQUE2RTtBQUU3RSxrQkFBa0IifQ==