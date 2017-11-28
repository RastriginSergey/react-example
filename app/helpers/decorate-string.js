import React from 'react';

const reactifyRegExp = /(\{[^}]+\}|\r\n|\r|\n)/,
	reactifyWrapRegExp = /(\{[^}]+\})/,
	reactifyNlRegExp = /(\r\n|\r|\n)/;

/**
 * Helper to decorate string with React-components.
 *
 * @param  {String}                      string   [string with braces]
 * @param  {...Function|React.Component} wrappers [wrapper functions or React-components]
 * @return {Array<String, React.Component>}
 */
export default function decorateString(string, ...wrappers) {

	if (typeof string === 'number') {
		return string;
	} else
	if (typeof string !== 'string') {
		return '';
	}

	let wrapperIndex = 0;

	return string.split(reactifyRegExp).map((part, index) => {

		if (part.match(reactifyNlRegExp)) {
			return React.createElement('br', { key: index });
		}

		if (part.match(reactifyWrapRegExp)) {

			const wrapper = wrappers[wrapperIndex++],
				content = part.replace(/^\{|\}$/g, '');

			if (typeof wrapper == 'function') {
				return wrapper(content, index);
			}

			if (typeof wrapper == 'object') {
				return {
					...wrapper,
					key:   String(index),
					props: !content.length ? wrapper.props : {
						...wrapper.props,
						children: content
					}
				};
			}

			return content;
		}

		return part;
	});
}
