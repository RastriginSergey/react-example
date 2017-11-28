import initialState from './initial-state';
import { fromJS, is } from 'immutable';
import { handleActions } from 'redux-actions';
import { auto } from '~/actions';
import { successSuffix } from '~/axios';

export default handleActions({

	[auto.loadActions + successSuffix](state, { payload: { data } }) {
		return state.merge(fromJS({
			actions: data.results,
			count:   data.count,
			draft:   data.stat.draft,
			active:  data.stat.active,
			pause:   data.stat.pause
		}));
	},

	[auto.setPageSize](state, { payload }) {
		return state.set('pageSize', payload);
	},

	[auto.setPageNum](state, { payload }) {
		return state.set('pageNum', payload);
	},

	[auto.loadFolders + successSuffix](state, { payload: { data } }) {
		return state.set('actionFolders', fromJS(data.results));
	},

	[auto.setFilter](state, { payload }) {
		return state.merge(fromJS({
			filter:  payload,
			pageNum: 1
		}));
	},

	[auto.setSearch](state, { payload }) {
		return state.set('search', payload);
	},

	[auto.setActionFilterFolder](state, { payload }) {

		const actionFilterFolder = fromJS(payload);

		return state.merge({
			actionFilterFolder: is(state.get('actionFilterFolder'), actionFilterFolder)
				? null
				: actionFilterFolder,
			pageNum:            1
		});
	},

	[auto.setActionFilterSegment](state, { payload }) {

		const actionFilterSegment = fromJS(payload);

		return state.merge({
			actionFilterSegment: is(state.get('actionFilterSegment'), actionFilterSegment)
				? null
				: actionFilterSegment,
			pageNum:             1
		});
	},

	[auto.setActionFilterCategories](state, { payload }) {

		const actionCategoriesFilter = state.get('actionCategoriesFilter');

		return state.set(
			'actionCategoriesFilter',
			actionCategoriesFilter.contains(payload)
				? actionCategoriesFilter.filterNot(v => v === payload)
				: actionCategoriesFilter.push(payload)
		);
	}

}, initialState);
