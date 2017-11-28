/* eslint-env jest */
import { fromJS, List, Map } from 'immutable';
import { successSuffix } from '~/axios';
import { auto } from '~/actions';
import initialState from './initial-state';
import reducer from './auto';

describe('Auto action reducer: ', () => {

	it('initial auto action state', () => {
		expect(reducer(global.undefined, {})).toEqual(initialState);
	});

	it('loading auto actions', () => {

		const action = {
			type:    auto.loadActions + successSuffix,
			payload: {
				data: {
					results: [{ message: '123' }, { message: '23232' }],
					count:   100,
					stat:    {
						draft:  10,
						active: 10,
						pause:  10
					}
				}
			}
		};

		const expected = initialState.merge(fromJS({
			actions: action.payload.data.results,
			count:   action.payload.data.count,
			draft:   action.payload.data.stat.draft,
			active:  action.payload.data.stat.active,
			pause:   action.payload.data.stat.pause
		}));

		expect(reducer(initialState, action)).toEqual(expected);
	});

	it('set page size', () => {

		const action = {
			type:    auto.setPageSize.toString(),
			payload: 10
		};

		const expected = initialState.set('pageSize', action.payload);

		expect(reducer(initialState, action)).toEqual(expected);
	});

	it('set page num', () => {

		const action = {
			type:    auto.setPageNum,
			payload: 44
		};

		const expected = initialState.set('pageNum', action.payload);

		expect(reducer(initialState, action)).toEqual(expected);
	});

	it('load action folders', () => {

		const action = {
			type:    auto.loadFolders + successSuffix,
			payload: {
				data: {
					results: [1, 2, 3]
				}
			}
		};

		const expected = initialState.set('actionFolders', fromJS(action.payload.data.results));

		expect(reducer(initialState, action)).toEqual(expected);
	});

	it('set search', () => {

		const action = {
			type:    auto.setSearch.toString(),
			payload: 'some string'
		};

		const expected = initialState.set('search', action.payload);

		expect(reducer(initialState, action)).toEqual(expected);
	});

	it('set action filter folder', () => {

		const action = {
			type:    auto.setActionFilterFolder.toString(),
			payload: 2
		};

		const expected = initialState.merge(Map({
			actionFilterFolder: 2,
			pageNum:            1
		}));

		expect(reducer(initialState, action)).toEqual(expected);
	});

	it('set action filter segment', () => {

		const action = {
			type:    auto.setActionFilterSegment.toString(),
			payload: 4
		};

		const expected = initialState.merge(Map({
			actionFilterSegment: 4,
			pageNum:             1
		}));

		expect(reducer(initialState, action)).toEqual(expected);
	});

	it('set filter', () => {

		const action = {
			type:    auto.setFilter.toString(),
			payload: 'filter string'
		};

		const expected = initialState.merge(Map({
			filter:  action.payload,
			pageNum: 1
		}));

		expect(reducer(initialState, action)).toEqual(expected);
	});

	it('set filter action categories', () => {

		const action = {
			type:    auto.setActionFilterCategories.toString(),
			payload: 'filter string'
		};

		const expected = initialState.merge(Map({
			actionCategoriesFilter: List([action.payload]),
			pageNum:                1
		}));

		expect(reducer(initialState, action)).toEqual(expected);
	});
});
