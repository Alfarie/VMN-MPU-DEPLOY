import SGLogger from '../logger/sensors-logger';
import VmnLogger from '../logger/vmn-logger';
import moment from 'moment';
export var InitSGLogger = () => {
    const loggingTime = 50000;
    var json = {
        datetime: moment('2018-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss'),
        soil: 0,
        temperature: 0,
        humidity: 0,
        vpd: 0,
        par: 0,
        co2: 0,
        paracc: 0
    };
    setTimeout(() => {
        for (var i = 0; i < loggingTime; i++) {
            json.datetime = moment(json.datetime).add(1, 'minute').format('YYYY-MM-DD HH:mm:ss');
            json.soil = Math.random();
            json.temperature = Math.random();
            json.humidity = Math.random();
            json.vpd = Math.random();
            json.par = Math.random();
            json.co2 = Math.random();
            json.paracc = Math.random();
            SGLogger.log(json);
        }
    }, 2000);
};
var getNodes = () => {
    return {
        supply: Math.random() * 2.0,
        nodes: [
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 }
        ],
        datetime: moment().format('YYYY-MM-DD HH:mm:ss')
    };
};
export var InitVmnLogger = () => {
    const loggingTime = 1440 * 30;
    var json = {
        supply: 2.0,
        nodes: [
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 },
            { ec: Math.random() * 1, volume: 300 }
        ],
        datetime: moment('2019-02-11 00:00:00').format('YYYY-MM-DD HH:mm:ss')
    };
    var h = -1;
    var vol = 40;
    setTimeout(() => {
        for (var i = 0; i < loggingTime; i++) {
            let dt = moment(json.datetime).add(1, 'minute');
            if (h != dt.hour()) {
                vol += 40;
                h = dt.hour();
            }
            let datetime = dt.format('YYYY-MM-DD HH:mm:ss');
            json = { ...getNodes(), datetime };
            json.nodes = json.nodes.map(node => {
                return { 'ec': node.ec, 'volume': vol };
            });
            // console.log(json)
            VmnLogger.log({
                datetime: datetime,
                data: json
            });
        }
        console.log('finish');
    }, 2000);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtc2Vuc29ycy1sb2dnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvc2ltdWxhdGlvbi9nZW5lcmF0ZS1zZW5zb3JzLWxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRCxPQUFPLFNBQVMsTUFBTSxzQkFBc0IsQ0FBQztBQUM3QyxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUE7QUFFM0IsTUFBTSxDQUFDLElBQUksWUFBWSxHQUFHLEdBQUcsRUFBRTtJQUUzQixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDMUIsSUFBSSxJQUFJLEdBQVE7UUFDWixRQUFRLEVBQUUsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQ3JFLElBQUksRUFBRSxDQUFDO1FBQ1AsV0FBVyxFQUFFLENBQUM7UUFDZCxRQUFRLEVBQUUsQ0FBQztRQUNYLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLE1BQU0sRUFBRSxDQUFDO0tBQ1osQ0FBQTtJQUNELFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3JGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FB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