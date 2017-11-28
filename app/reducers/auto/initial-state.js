import { fromJS } from 'immutable';

const initialState = fromJS({
	actions:                [],
	count:                  0,
	draft:                  0,
	active:                 0,
	pause:                  0,
	filter:                 null,
	actionCategoriesFilter: [],
	actionFolders:          [],
	actionFilterFolder:     null,
	actionFilterSegment:    null,
	pageSize:               10,
	pageNum:                1,
	search:                 ''
});

export default initialState;

