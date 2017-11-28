import { createActions } from 'redux-actions';
import { containsInvalidPageError } from '~/helpers';
import { contacts, wizard } from '../../actions';

export const { auto } = createActions({

	auto: {

		loadFolders() {
			return {
				request: {
					url: '/api/folders/'
				}
			};
		},

		addFolder(folderName, setAsCurrent = false) {
			return async (payload, dispatch) => {

				const request = {
					request: {
						url:    '/api/folders/',
						method: 'POST',
						data:   { name: folderName }
					}
				};

				const { payload: { data } } = await payload(request);

				const newFolder = {
					value: data.id,
					label: data.name
				};

				dispatch(auto.loadFolders());

				if (setAsCurrent) {
					dispatch(wizard.setActionFolder(newFolder));
				}
			};
		},

		deleteFolder(folderId) {
			return async (payload, dispatch) => {

				const request = {
					request: {
						url:    `/api/folders/${folderId}/`,
						method: 'DELETE'
					}
				};

				await payload(request);

				dispatch(auto.loadFolders());
			};
		},

		updateFolder(folder) {
			return async (payload, dispatch) => {

				const request = {
					request: {
						url:    `/api/folders/${folder.id}/`,
						method: 'PATCH',
						data:   folder
					}
				};

				await payload(request);

				dispatch(auto.loadFolders());
				dispatch(auto.setFolderEditId(null));
			};
		},

		loadActions(filters) {
			return async (payload, dispatch, getState) => {

				const state = getState().get('autoActionState').toJS(),
					params = filters ? {
						format: 'json',
						...filters
					} : {
						...state.filter,
						actionCategories: state.actionCategoriesFilter,
						folder:           state.actionFilterFolder,
						search:           state.search,
						segment:          state.actionFilterSegment,
						page:             state.pageNum,
						pageSize:         state.pageSize,
						format:           'json'
					},
					request = {
						request: {
							url: '/api/auto_actions/',
							params
						}
					};

				const response = await payload(request);

				if (containsInvalidPageError(response)) {
					dispatch(auto.setPageNum(state.pageNum - 1));
				}
			};
		},

		saveAction(actionId, data) {
			return async (payload, dispatch) => {

				const request = {
					request: {
						url:    `/api/auto_actions/${actionId}/`,
						method: 'PATCH',
						data
					}
				};

				await payload(request);

				dispatch(auto.loadActions());
				dispatch(contacts.loadContacts());
			};
		},

		setActionFilterFolder(folderId) {
			return (payload, dispatch) => {
				payload(folderId);
				dispatch(auto.loadActions());
			};
		},

		setActionFilterSegment(segmentId) {
			return (payload, dispatch) => {
				payload(segmentId);
				dispatch(auto.loadActions());
			};
		},

		setActionFilterCategories(actionCategoryId) {
			return (payload, dispatch) => {
				payload(actionCategoryId);
				dispatch(auto.loadActions());
			};
		},

		setPageNum(pageNum) {
			return (payload, dispatch) => {
				payload(pageNum);
				dispatch(auto.loadActions());
			};
		},

		setPageSize(pageSize) {
			return (payload, dispatch) => {
				payload(pageSize);
				dispatch(auto.setPageNum(1));
				dispatch(auto.loadActions());
			};
		},

		setFilter(filter) {
			return (payload, dispatch) => {
				payload(filter);
				dispatch(auto.loadActions());
			};
		},

		setSearch(query) {
			return (payload, dispatch) => {
				payload(query);
				dispatch(auto.loadActions());
			};
		}
	}
});
