import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './badge.scss';

Badge.propTypes = {
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired
};

export default function Badge({
	className, label,
	...props
}) {
	return (
		<div
			className={classNames(className, 'badge')}
			{...props}
		>
			{label}
		</div>
	);
}

export function BadgeContainer({
	className, ...props
}) {
	return (
		<span
			className={classNames(className, 'badge-container')}
			{...props}
		/>
	);
}
