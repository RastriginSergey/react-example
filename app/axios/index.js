import axios from 'axios';
import axiosDefaults from 'axios/lib/defaults';
import Qs from 'qs';
import Cookie from 'js-cookie';
import {
	camelizeKeys,
	decamelizeKeys
} from 'humps';

export default axios.create({
	responseType:      'json',
	headers:           { 'X-CSRFToken': Cookie.get('csrftoken') },
	paramsSerializer:  params => Qs.stringify(decamelizeKeys(params), { indices: false }),
	transformRequest:  [data => decamelizeKeys(data, { plainOnly: true }), ...axiosDefaults.transformRequest],
	transformResponse: [data => camelizeKeys(data), ...axiosDefaults.transformResponse]
});

export const successSuffix = '_success';

export const errorSuffix = '_fail';

export const reduxConfig = {
	successSuffix,
	errorSuffix
};
