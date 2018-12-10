"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.control = {
    "ch": 1,
    "mode": 0,
    "sensor": 0,
    "manual": {
        "status": 0
    },
    "timer": {
        "size": 3,
        "mode": 0,
        "list": [[0, 60], [120, 180], [300, 360]]
    },
    "irrigation": {
        "soil_upper": 60,
        "soil_lower": 40,
        "soil_detecting": 30,
        "soil_working": 15,
        "par_soil_setpoint": 50,
        "par_detecting": 30,
        "par_working": 15,
        "par_acc": 1.5,
        "mode": 1,
        "limit_time": 3,
        "descent_rate": 0.2
    },
    "dfirrigation": {
        "upper": 60,
        "lower": 40,
        "paracc": 1.0,
        "working": 15,
        "descent": 50
    },
    "advcond": {
        "timer_list": [],
        "timer_size": 0,
        "timer_flag": false,
        "sensor_condition": 3,
        "sensor_setpoint": 30,
        "sensor_flag": false,
        "sensor_direction": 0,
        "sensor": 5,
        "setpoint": 600,
        "working": 15,
        "detecting": 30,
        "direction": 0
    },
    "advsb": {
        "timer_list": [],
        "timer_size": 0,
        "timer_flag": false,
        "sensor_condition": 3,
        "sensor_setpoint": 30,
        "sensor_flag": false,
        "sensor_direction": 0,
        "sensor": 5,
        "upper": 2000,
        "lower": 1500,
        "direction": 0
    },
    "advsbt": {
        "timer_list": [],
        "timer_size": 0,
        "timer_flag": false,
        "sensor_condition": 3,
        "sensor_setpoint": 30,
        "sensor_flag": false,
        "sensor_direction": 0,
        "sensor": 5,
        "upper": 2000,
        "lower": 1500,
        "working": 10,
        "detecting": 10,
        "direction": 0
    }
};
exports.sensors = {
    soil: 0,
    temperature: 0,
    humidity: 0,
    vpd: 0,
    par: 0,
    co2: 0,
    paracc: 0
};
exports.datetime = {
    date: '2018-01-01',
    time: '00:00:00'
};
exports.gpio = [0, 0, 0, 0];
exports.paracc = [0, 0, 0, 0];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2RldmljZS9kZXZpY2UtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLE9BQU8sR0FBSTtJQUNwQixJQUFJLEVBQUUsQ0FBQztJQUNQLE1BQU0sRUFBRSxDQUFDO0lBQ1QsUUFBUSxFQUFFLENBQUM7SUFDWCxRQUFRLEVBQUU7UUFDTixRQUFRLEVBQUUsQ0FBQztLQUNkO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsTUFBTSxFQUFFLENBQUM7UUFDVCxNQUFNLEVBQUMsQ0FBQztRQUNSLE1BQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsWUFBWSxFQUFFLEVBQUU7UUFDaEIsWUFBWSxFQUFFLEVBQUU7UUFDaEIsZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixjQUFjLEVBQUUsRUFBRTtRQUVsQixtQkFBbUIsRUFBRSxFQUFFO1FBQ3ZCLGVBQWUsRUFBRSxFQUFFO1FBQ25CLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLFNBQVMsRUFBRSxHQUFHO1FBQ2QsTUFBTSxFQUFFLENBQUM7UUFDVCxZQUFZLEVBQUUsQ0FBQztRQUNmLGNBQWMsRUFBRSxHQUFHO0tBQ3RCO0lBQ0QsY0FBYyxFQUFFO1FBQ1osT0FBTyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUUsRUFBRTtRQUNYLFFBQVEsRUFBRSxHQUFHO1FBQ2IsU0FBUyxFQUFFLEVBQUU7UUFDYixTQUFTLEVBQUUsRUFBRTtLQUNoQjtJQUNELFNBQVMsRUFBRTtRQUNQLFlBQVksRUFBRSxFQUFFO1FBQ2hCLFlBQVksRUFBRSxDQUFDO1FBQ2YsWUFBWSxFQUFFLEtBQUs7UUFDbkIsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQixpQkFBaUIsRUFBRSxFQUFFO1FBQ3JCLGFBQWEsRUFBRSxLQUFLO1FBQ3BCLGtCQUFrQixFQUFFLENBQUM7UUFFckIsUUFBUSxFQUFFLENBQUM7UUFDWCxVQUFVLEVBQUUsR0FBRztRQUNmLFNBQVMsRUFBRSxFQUFFO1FBQ2IsV0FBVyxFQUFFLEVBQUU7UUFDZixXQUFXLEVBQUUsQ0FBQztLQUNqQjtJQUNELE9BQU8sRUFBRTtRQUNMLFlBQVksRUFBRSxFQUFFO1FBQ2hCLFlBQVksRUFBRSxDQUFDO1FBQ2YsWUFBWSxFQUFFLEtBQUs7UUFDbkIsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQixpQkFBaUIsRUFBRSxFQUFFO1FBQ3JCLGFBQWEsRUFBRSxLQUFLO1FBQ3BCLGtCQUFrQixFQUFFLENBQUM7UUFFckIsUUFBUSxFQUFFLENBQUM7UUFDWCxPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLENBQUM7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDTixZQUFZLEVBQUUsRUFBRTtRQUNoQixZQUFZLEVBQUUsQ0FBQztRQUNmLFlBQVksRUFBRSxLQUFLO1FBQ25CLGtCQUFrQixFQUFFLENBQUM7UUFDckIsaUJBQWlCLEVBQUUsRUFBRTtRQUNyQixhQUFhLEVBQUUsS0FBSztRQUNwQixrQkFBa0IsRUFBRSxDQUFDO1FBRXJCLFFBQVEsRUFBRSxDQUFDO1FBQ1gsT0FBTyxFQUFFLElBQUk7UUFDYixPQUFPLEVBQUUsSUFBSTtRQUNiLFNBQVMsRUFBRSxFQUFFO1FBQ2IsV0FBVyxFQUFFLEVBQUU7UUFDZixXQUFXLEVBQUUsQ0FBQztLQUNqQjtDQUNKLENBQUE7QUFFWSxRQUFBLE9BQU8sR0FBRztJQUNuQixJQUFJLEVBQUMsQ0FBQztJQUNOLFdBQVcsRUFBQyxDQUFDO0lBQ2IsUUFBUSxFQUFFLENBQUM7SUFDWCxHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLENBQUM7SUFDTixNQUFNLEVBQUUsQ0FBQztDQUNaLENBQUE7QUFFWSxRQUFBLFFBQVEsR0FBRztJQUNwQixJQUFJLEVBQUUsWUFBWTtJQUNsQixJQUFJLEVBQUUsVUFBVTtDQUNuQixDQUFBO0FBRVksUUFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtBQUVoQixRQUFBLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBIn0=