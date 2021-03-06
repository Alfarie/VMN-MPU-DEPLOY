import test from 'ava';
import fs from 'fs';
const returnPromise = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res('hello');
        }, 2000);
    });
};
test('should return hello when promise is success', async (t) => {
    const value = await returnPromise();
    t.is(value, 'hello');
});
test.cb.skip('data.txt can be read', t => {
    // `t.end` automatically checks for error as first argument
    fs.readFile('data.txt', t.end);
});
test.todo('will think about writing this later');
test.serial.todo('will think about writing this later with serial');
test.failing('demonstrate some bug', t => {
    t.fail(); // Test will count as passed
});
test.before(t => {
    t.context = 'unicorn';
});
test('context is unicorn', t => {
    t.is(t.context, 'unicorn');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L2hlbGxvLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQTtBQUVuQixNQUFNLGFBQWEsR0FBRyxHQUFFLEVBQUU7SUFDekIsT0FBTyxJQUFJLE9BQU8sQ0FBRSxDQUFDLEdBQUcsRUFBQyxFQUFFO1FBQzFCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDYixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQTtBQUNELElBQUksQ0FBQyw2Q0FBNkMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDOUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQztJQUNwQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUNyQixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ3hDLDJEQUEyRDtJQUMzRCxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7QUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQztBQUVwRSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ3hDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLDRCQUE0QjtBQUN2QyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDZixDQUFDLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUMifQ==