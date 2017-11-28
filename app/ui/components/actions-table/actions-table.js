import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tag from '../tag/tag';
import Link from '../link/link';
import { humanizeVariableName } from '../../helpers/draft';
import IconMail from '~/icons/mail.svg';
import IconTag from '~/icons/tag.svg';
import IconPhone from '~/icons/phone.svg';
import IconContact from '~/icons/contact.svg';
import IconSkype from '~/icons/skype.svg';
import './actions-table.scss';

export default function ActionsTable({
	className, ...props
}) {
	return (
		<table
			className={classNames(className, 'actions-table')}
			{...props}
		/>
	);
}

export function ActionsTableHead({
	className, ...props
}) {
	return (
		<thead
			className={classNames(className, 'actions-table__head')}
			{...props}
		/>
	);
}

export function ActionsTableBody({
	className, ...props
}) {
	return (
		<tbody
			className={classNames(className, 'actions-table__body')}
			{...props}
		/>
	);
}

export function ActionsTableRow({
	className, ...props
}) {
	return (
		<tr
			className={classNames(className, 'actions-table__row')}
			{...props}
		/>
	);
}

ActionsTableCell.propTypes = {
	head: PropTypes.bool
};

export function ActionsTableCell({
	className, head,
	...props
}) {

	const Cell = head ? 'th' : 'td';

	return (
		<Cell
			className={classNames(className, 'actions-table__cell', {
				'actions-table__cell--head': head
			})}
			{...props}
		/>
	);
}

ActionsTableDraftTag.propTypes = Tag.propTypes;

export function ActionsTableDraftTag({
	className, ...props
}) {
	return (
		<Tag
			className={classNames(className, 'actions-table__draft-tag')}
			color="info"
			{...props}
		>
			Draft
		</Tag>
	);
}

export function ActionsTableIconMail({
	className, ...props
}) {
	return (
		<IconMail
			className={classNames(className, 'actions-table__icon-mail')}
			{...props}
		/>
	);
}

export function ActionsTableIconTag({
	className, ...props
}) {
	return (
		<IconTag
			className={classNames(className, 'actions-table__icon-tag')}
			{...props}
		/>
	);
}

export function ActionsTableIconPhone({
	className, ...props
}) {
	return (
		<IconPhone
			className={classNames(className, 'actions-table__icon-phone')}
			{...props}
		/>
	);
}

export function ActionsTableIconSkype({
	className, ...props
}) {
	return (
		<IconSkype
			className={classNames(className, 'actions-table__icon-skype')}
			{...props}
		/>
	);
}

ActionsTableNameLink.propTypes = Link.propTypes;

export function ActionsTableNameLink({
	className, ...props
}) {
	return (
		<Link
			className={classNames(className, 'actions-table__name-link')}
			{...props}
		/>
	);
}

ActionsTableSubject.propTypes = {
	children: PropTypes.string.isRequired,
	disabled: PropTypes.bool
};

export function ActionsTableSubject({
	className, children,
	disabled, ...props
}) {
	return (
		<div
			className={classNames(className, 'actions-table__subject', {
				'actions-table__subject--disabled': disabled
			})}
			{...props}
		>
			{children.split(/{{|}}/g).map((part, i) => (
				i % 2 == 0 ? (
					<span key={i}>
						{part}
					</span>
				) : (
					<Tag
						key={i}
						color="info"
					>
						{humanizeVariableName(part)}
					</Tag>
				)
			))}
		</div>
	);
}

export function ActionsTableTime({
	className, ...props
}) {
	return (
		<div
			className={classNames(className, 'actions-table__time')}
			{...props}
		/>
	);
}

export function ActionsTableList({
	className, ...props
}) {
	return (
		<ul
			className={classNames(className, 'actions-table__list')}
			{...props}
		/>
	);
}

export function ActionsTableListItem({
	className, ...props
}) {
	return (
		<li
			className={classNames(className, 'actions-table__list-item')}
			{...props}
		/>
	);
}

ActionsTableTag.propTypes = Tag.propTypes;

export function ActionsTableTag({
	className, ...props
}) {
	return (
		<Tag
			className={classNames(className, 'actions-table__tag')}
			{...props}
		/>
	);
}

ActionsTableRecipientsLink.propTypes = Link.propTypes;

export function ActionsTableRecipientsLink({
	className, ...props
}) {
	return (
		<Link
			className={classNames(className, 'actions-table__recipients-link')}
			icon={<IconContact/>}
			{...props}
		/>
	);
}

export function ActionsTableNumber({
	className, ...props
}) {
	return (
		<span
			className={classNames(className, 'actions-table__number')}
			{...props}
		/>
	);
}
