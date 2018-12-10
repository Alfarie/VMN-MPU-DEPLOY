// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { sha256, sha256Native } from './hash';
const hash = (t, input, expected) => {
    t.is(sha256(input), expected);
    t.is(sha256Native(input), expected);
};
hash.title = (providedTitle, input, expected) => `${providedTitle}: ${input} => ${expected}`;
test('sha256', hash, 'test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oYXNoLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNERBQTREO0FBQzVELE9BQU8sSUFBZSxNQUFNLEtBQUssQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUU5QyxNQUFNLElBQUksR0FBVSxDQUFDLENBQUMsRUFBRSxLQUFhLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO0lBQ3pELENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUVGLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxhQUFxQixFQUFFLEtBQWEsRUFBRSxRQUFnQixFQUFFLEVBQUUsQ0FDdEUsR0FBRyxhQUFhLEtBQUssS0FBSyxPQUFPLFFBQVEsRUFBRSxDQUFDO0FBRTlDLElBQUksQ0FDRixRQUFRLEVBQ1IsSUFBSSxFQUNKLE1BQU0sRUFDTixrRUFBa0UsQ0FDbkUsQ0FBQyJ9