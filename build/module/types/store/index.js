import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import operation from './operation';
import nodes from './nodes';
import preset from './preset';
const middlewares = [thunk];
const reducers = combineReducers({
    operation, nodes, preset
});
export default createStore(reducers, applyMiddleware(...middlewares));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvc3RvcmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQ3BFLE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQTtBQUMvQixPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUE7QUFDbkMsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFBO0FBQzNCLE9BQU8sTUFBTSxNQUFNLFVBQVUsQ0FBQTtBQUM3QixNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBRTNCLE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQztJQUM3QixTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU07Q0FDekIsQ0FBQyxDQUFBO0FBRUYsZUFBZSxXQUFXLENBQUMsUUFBUSxFQUFDLGVBQWUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUEifQ==