import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getLinkElement } from '../link/link';
import './aside-nav.scss';

export default function AsideNav({
	className, children,
	...props
}) {
	return (
		<aside
			className={classNames(className, 'aside-nav')}
			{...props}
		>
			<div className="aside-nav__scroller">
				{children}
			</div>
		</aside>
	);
}

AsideNavGroup.propTypes = {
	placement: PropTypes.oneOf(['top', 'bottom'])
};

export function AsideNavGroup({
	className, placement,
	...props
}) {
	return (
		<div
			className={classNames(className, 'aside-nav__group', {
				[`aside-nav__group--${placement}`]: placement
			})}
			{...props}
		/>
	);
}

AsideNavLink.propTypes = {
	icon:    PropTypes.element.isRequired,
	primary: PropTypes.bool,
	active:  PropTypes.bool
};

export function AsideNavLink({
	className, children,
	icon, primary,
	active, ...props
}) {

	let linkIcon = null;

	if (icon !== null) {
		linkIcon = {
			...icon,
			props: {
				...icon.props,
				className: classNames(icon.props.className, 'aside-nav__link-icon')
			}
		};
	}

	const Link = getLinkElement();

	return (
		<Link
			className={classNames(className, 'aside-nav__link', {
				'aside-nav__link--primary': primary,
				'aside-nav__link--active':  active
			})}
			tabIndex=""
			{...props}
		>
			{linkIcon}
			{children}
		</Link>
	);
}
