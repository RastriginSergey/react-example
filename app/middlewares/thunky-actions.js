/**
 * Example of usage:
 *
 * const someAction = createAction('SOME_ACTION', (arg, ume, nts) => {
 *     return (payload, dispatch, getState) => {
 *         dispatch(someBeforeAction());
 *         payload({ arg, ume, nts });
 *         dispatch(someAfterAction());
 *     };
 * })
 */

import { isFSA } from 'flux-standard-action';

export default function thunkyActionsMiddleware({ dispatch }) {
	return next => (action) => {

		if (isFSA(action) && typeof action.payload == 'function') {

			const dispatchWithPayload = (payload, meta) => dispatch({
				...action,
				payload,
				meta
			});

			return next((...args) =>
				action.payload(dispatchWithPayload, ...args)
			);
		}

		return next(action);
	};
}
