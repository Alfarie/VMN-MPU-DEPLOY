"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_act_1 = require("redux-act");
const fs_1 = require("fs");
const path_1 = require("path");
const device_model_1 = require("../device/device-model");
const FILE_PATH = path_1.join(path_1.resolve(__dirname, '../../../../DB/preset.json'));
const NS = `PRESET`;
exports.setPreset = redux_act_1.createAction(`${NS}_SET_PRESET`);
const initState = fs_1.existsSync(FILE_PATH) ?
    require(FILE_PATH) : [
    { data: JSON.parse(JSON.stringify(device_model_1.control)), name: 'Preset 1' },
    { data: JSON.parse(JSON.stringify(device_model_1.control)), name: 'Preset 2' }
];
exports.default = redux_act_1.createReducer({
    [exports.setPreset]: ({}, payload) => {
        console.log('payload: ', payload);
        fs_1.writeFileSync(FILE_PATH, JSON.stringify(payload));
        return payload;
    }
}, initState);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL3N0b3JlL3ByZXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUF1RDtBQUN2RCwyQkFBMkM7QUFDM0MsK0JBQWtDO0FBQ2xDLHlEQUE4QztBQUU5QyxNQUFNLFNBQVMsR0FBSSxXQUFJLENBQUMsY0FBTyxDQUFDLFNBQVMsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7QUFDMUUsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFBO0FBQ04sUUFBQSxTQUFTLEdBQU8sd0JBQVksQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFFOUQsTUFBTSxTQUFTLEdBQUcsZUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7SUFDaEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNmLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDO0lBQzlELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDO0NBQ2pFLENBQUE7QUFDVCxrQkFBZSx5QkFBYSxDQUFDO0lBQ3pCLENBQUMsaUJBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBQyxFQUFFO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLGtCQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0NBQ0osRUFBRSxTQUFTLENBQUMsQ0FBQSJ9