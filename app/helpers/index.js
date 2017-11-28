import Pace from 'pace-progress';
import Moment, { utc as Utc } from 'moment';

/**
 * Make upper case the first letter.
 *
 * @param  {String} string [string to capitalize]
 * @return {String}
 */
export function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Repeat given string some times with some glue.
 *
 * @param  {String} string [string to repeat]
 * @param  {Number} times  [times to repeat]
 * @param  {String} glue   [glue between repeats]
 * @return {String}
 */
export function repeat(string, times, glue = '') {
	return Array(times).fill(string).join(glue);
}

/**
 * Helper for react-router to load modules with React-components.
 *
 * @param  {Promise} moduleLoading [Promise, e.g. produced by dynamic import]
 * @return {Function}
 */
export function loadComponent(moduleLoading) {
	return (_, callback) => {
		Pace.restart();
		moduleLoading().then((_) => {
			callback(null, _.default);
		});
	};
}

/**
 * Construct Moment from string or serialized Moment-object.
 *
 * @param  {String|Object|Moment} date [source date]
 * @return {Moment}
 */
export function MomentFrom(date) {

	if (!date) {
		return date;
	}

	if (date instanceof Moment) {
		return date;
	}

	if (typeof date == 'string') {
		return Moment(date);
	}

	if (date && date.d) {
		return Moment(date.d);
	}

	return date;
}

/**
 * Construct UTC Moment from string or serialized Moment-object.
 *
 * @param  {String|Object|Moment} date [source date]
 * @return {Moment}
 */
export function UtcFrom(date) {

	if (!date) {
		return date;
	}

	if (date instanceof Moment) {
		return date;
	}

	if (typeof date == 'string') {
		return Utc(date);
	}

	if (date && date.d) {
		return Utc(date.d);
	}

	return date;
}

/**
 * Helper to detect error in pagination response.
 *
 * @param  {Object} response
 * @return {Boolean}
 */
export function containsInvalidPageError(response) {

	const { error } = response;

	if (error && error.response && error.response.data) {

		const { response: { data: { errors } } } = error;

		if (errors.some(_ => _.detail == 'Invalid page.')) {
			return true;
		}
	}

	return false;
}

/**
 * Get flat array with errors from response object.
 *
 * @param  {Object} options.errors
 * @return {Array<String>}
 */
export function errorsFromResponse(response) {

	if (!response || !response.data || !response.data.errors) {
		return [];
	}

	const { data: { errors } } = response;

	return [].concat(
		...errors.map(_ =>
			[].concat(
				...Object.values(_)
			)
		)
	);
}
