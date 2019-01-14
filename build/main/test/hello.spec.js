"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const fs_1 = __importDefault(require("fs"));
const returnPromise = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res('hello');
        }, 2000);
    });
};
ava_1.default('should return hello when promise is success', async (t) => {
    const value = await returnPromise();
    t.is(value, 'hello');
});
ava_1.default.cb.skip('data.txt can be read', t => {
    // `t.end` automatically checks for error as first argument
    fs_1.default.readFile('data.txt', t.end);
});
ava_1.default.todo('will think about writing this later');
ava_1.default.serial.todo('will think about writing this later with serial');
ava_1.default.failing('demonstrate some bug', t => {
    t.fail(); // Test will count as passed
});
ava_1.default.before(t => {
    t.context = 'unicorn';
});
ava_1.default('context is unicorn', t => {
    t.is(t.context, 'unicorn');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L2hlbGxvLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBdUI7QUFDdkIsNENBQW1CO0FBRW5CLE1BQU0sYUFBYSxHQUFHLEdBQUUsRUFBRTtJQUN6QixPQUFPLElBQUksT0FBTyxDQUFFLENBQUMsR0FBRyxFQUFDLEVBQUU7UUFDMUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNmLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNiLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFBO0FBQ0QsYUFBSSxDQUFDLDZDQUE2QyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM5RCxNQUFNLEtBQUssR0FBRyxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDeEMsMkRBQTJEO0lBQzNELFlBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQztBQUNqRCxhQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO0FBRXBFLGFBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDeEMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsNEJBQTRCO0FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNmLENBQUMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyJ9