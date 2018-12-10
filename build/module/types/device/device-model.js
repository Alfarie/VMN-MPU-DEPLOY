export const control = {
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
export const sensors = {
    soil: 0,
    temperature: 0,
    humidity: 0,
    vpd: 0,
    par: 0,
    co2: 0,
    paracc: 0
};
export const datetime = {
    date: '2018-01-01',
    time: '00:00:00'
};
export const gpio = [0, 0, 0, 0];
export const paracc = [0, 0, 0, 0];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2RldmljZS9kZXZpY2UtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFJO0lBQ3BCLElBQUksRUFBRSxDQUFDO0lBQ1AsTUFBTSxFQUFFLENBQUM7SUFDVCxRQUFRLEVBQUUsQ0FBQztJQUNYLFFBQVEsRUFBRTtRQUNOLFFBQVEsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxPQUFPLEVBQUU7UUFDTCxNQUFNLEVBQUUsQ0FBQztRQUNULE1BQU0sRUFBQyxDQUFDO1FBQ1IsTUFBTSxFQUFFLENBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUM7SUFDRCxZQUFZLEVBQUU7UUFDVixZQUFZLEVBQUUsRUFBRTtRQUNoQixZQUFZLEVBQUUsRUFBRTtRQUNoQixnQkFBZ0IsRUFBRSxFQUFFO1FBQ3BCLGNBQWMsRUFBRSxFQUFFO1FBRWxCLG1CQUFtQixFQUFFLEVBQUU7UUFDdkIsZUFBZSxFQUFFLEVBQUU7UUFDbkIsYUFBYSxFQUFFLEVBQUU7UUFDakIsU0FBUyxFQUFFLEdBQUc7UUFDZCxNQUFNLEVBQUUsQ0FBQztRQUNULFlBQVksRUFBRSxDQUFDO1FBQ2YsY0FBYyxFQUFFLEdBQUc7S0FDdEI7SUFDRCxjQUFjLEVBQUU7UUFDWixPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFLEdBQUc7UUFDYixTQUFTLEVBQUUsRUFBRTtRQUNiLFNBQVMsRUFBRSxFQUFFO0tBQ2hCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsWUFBWSxFQUFFLEVBQUU7UUFDaEIsWUFBWSxFQUFFLENBQUM7UUFDZixZQUFZLEVBQUUsS0FBSztRQUNuQixrQkFBa0IsRUFBRSxDQUFDO1FBQ3JCLGlCQUFpQixFQUFFLEVBQUU7UUFDckIsYUFBYSxFQUFFLEtBQUs7UUFDcEIsa0JBQWtCLEVBQUUsQ0FBQztRQUVyQixRQUFRLEVBQUUsQ0FBQztRQUNYLFVBQVUsRUFBRSxHQUFHO1FBQ2YsU0FBUyxFQUFFLEVBQUU7UUFDYixXQUFXLEVBQUUsRUFBRTtRQUNmLFdBQVcsRUFBRSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsWUFBWSxFQUFFLEVBQUU7UUFDaEIsWUFBWSxFQUFFLENBQUM7UUFDZixZQUFZLEVBQUUsS0FBSztRQUNuQixrQkFBa0IsRUFBRSxDQUFDO1FBQ3JCLGlCQUFpQixFQUFFLEVBQUU7UUFDckIsYUFBYSxFQUFFLEtBQUs7UUFDcEIsa0JBQWtCLEVBQUUsQ0FBQztRQUVyQixRQUFRLEVBQUUsQ0FBQztRQUNYLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLElBQUk7UUFDYixXQUFXLEVBQUUsQ0FBQztLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNOLFlBQVksRUFBRSxFQUFFO1FBQ2hCLFlBQVksRUFBRSxDQUFDO1FBQ2YsWUFBWSxFQUFFLEtBQUs7UUFDbkIsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQixpQkFBaUIsRUFBRSxFQUFFO1FBQ3JCLGFBQWEsRUFBRSxLQUFLO1FBQ3BCLGtCQUFrQixFQUFFLENBQUM7UUFFckIsUUFBUSxFQUFFLENBQUM7UUFDWCxPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO1FBQ2IsU0FBUyxFQUFFLEVBQUU7UUFDYixXQUFXLEVBQUUsRUFBRTtRQUNmLFdBQVcsRUFBRSxDQUFDO0tBQ2pCO0NBQ0osQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRztJQUNuQixJQUFJLEVBQUMsQ0FBQztJQUNOLFdBQVcsRUFBQyxDQUFDO0lBQ2IsUUFBUSxFQUFFLENBQUM7SUFDWCxHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLENBQUM7SUFDTixNQUFNLEVBQUUsQ0FBQztDQUNaLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUc7SUFDcEIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsSUFBSSxFQUFFLFVBQVU7Q0FDbkIsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0FBRTdCLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBIn0=