import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { utc as Utc } from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ds from '~/helpers/decorate-string';
import { auto, notifications } from '~/actions';
import Link from '~/ui/components/link';
import Button from '~/ui/components/button';
import Switch from '~/ui/components/switch';
import Pagination from '~/ui/components/pagination';
import Select, { Option } from '~/ui/components/select';
import ConfirmModal, {
	ConfirmModalTitle,
	ConfirmModalBody,
	ConfirmModalFooter
} from '~/ui/components/confirm-modal';
import ActionsTable, {
	ActionsTableHead,
	ActionsTableBody,
	ActionsTableRow,
	ActionsTableCell,
	ActionsTableDraftTag,
	ActionsTableIconMail,
	ActionsTableIconTag,
	ActionsTableIconPhone,
	ActionsTableIconSkype,
	ActionsTableNameLink,
	ActionsTableSubject,
	ActionsTableTime,
	ActionsTableList,
	ActionsTableListItem,
	ActionsTableTag,
	ActionsTableNumber
} from '~/ui/components/actions-table';
import './auto-actions-table.scss';

function mapStateToProps(state) {
	return {
		profile:  state.getIn(['profileState', 'profile']).toJS(),
		pageNum:  state.getIn(['autoActionState', 'pageNum']),
		pageSize: state.getIn(['autoActionState', 'pageSize']),
		count:    state.getIn(['autoActionState', 'count']),
		actions:  state.getIn(['autoActionState', 'actions']).toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		autoActions:          bindActionCreators(auto, dispatch),
		notificationsActions: bindActionCreators(notifications, dispatch)
	};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AutoActionsTable extends PureComponent {

	confirmActivationModalRef = null;

	render() {

		const {
			className, actions,
			pageNum, pageSize,
			count, profile
		} = this.props;

		return (
			<div className={classNames(className, 'auto-actions-table')}>
				<ActionsTable className="auto-actions-table__table">
					<ActionsTableHead>
						<ActionsTableRow>
							<ActionsTableCell head>
								{__`autoActions.columnType`}
							</ActionsTableCell>
							<ActionsTableCell head>
								{__`autoActions.columnAction`}
							</ActionsTableCell>
							<ActionsTableCell head>
								{__`autoActions.columnConditions`}
							</ActionsTableCell>
							<ActionsTableCell head/>
							<ActionsTableCell head>
								{__`autoActions.columnTouch`}
							</ActionsTableCell>
							<ActionsTableCell head>
								{__`autoActions.columnInvolved`}
							</ActionsTableCell>
							<ActionsTableCell head>
								{__`autoActions.columnFeedbackRate`}
							</ActionsTableCell>
							<ActionsTableCell head>
								{__`autoActions.columnBlocked`}
							</ActionsTableCell>
						</ActionsTableRow>
					</ActionsTableHead>
					<ActionsTableBody>
						{actions.map((action, i) => {

							const {
								id, isDraft,
								type, name,
								message, createdAt,
								isActive, metaStat,
								inDays, inHours,
								onWeekday, atTime,
								filterSegments, followupAction,
								filterTags, filterFields,
								sendLeftToday
							} = action;

							const isManage = type && type.name == 'manage',
								statEnabled = !isManage && metaStat;

							let typeIcon = null;

							if (type) {

								switch (type.name) {

									case 'send':
										typeIcon = (
											<ActionsTableIconMail/>
										);
										break;

									case 'manage':
										typeIcon = (
											<ActionsTableIconTag/>
										);
										break;

									case 'call':

										switch (type.category.name) {

											case 'Skype':
												typeIcon = (
													<ActionsTableIconSkype/>
												);
												break;

											default:
												typeIcon = (
													<ActionsTableIconPhone/>
												);
												break;
										}

										break;

									default:
										typeIcon = null;
										break;
								}
							}

							let followupActionId = 0,
								followupActionName = '',
								followupActionEvent = '',
								followupActionNotDelay = '';

							if (followupAction && followupAction.action) {
								followupActionId = followupAction.action.id;
								followupActionName = followupAction.action.name;
								followupActionEvent = followupAction.event || '...';
								followupActionNotDelay = followupAction.notDelay || 0;
							}

							return (
								<ActionsTableRow key={i}>
									<ActionsTableCell>
										{!isDraft ? null : (
											<ActionsTableDraftTag/>
										)}
										{!isDraft ? null : (
											<br/>
										)}
										{typeIcon}
									</ActionsTableCell>
									<ActionsTableCell>
										<ActionsTableNameLink
											data-stalk-onclick='["View", { "category": "Auto actions" }]'
											to={isDraft ? `/wizard/id/${id}` : `/actions/auto/${id}`}
										>
											{name}
										</ActionsTableNameLink>
										{!message ? null : message.variants.map(({ subject }, i) => (
											<ActionsTableSubject key={i}>
												{subject}
											</ActionsTableSubject>
										))}
										<ActionsTableTime>
											{Utc(createdAt).local().format('DD.MM.YYYY HH:mm')}
										</ActionsTableTime>
									</ActionsTableCell>
									<ActionsTableCell>
										<ActionsTableList>
											{!inDays && !inHours ? null : (
												<ActionsTableListItem>
													{__`autoActions.delay`}{' '}
													{!inDays ? null : `${__n`autoActions.inDays ${inDays}`} `}
													{!inHours ? null : __n`autoActions.inHours ${inHours}`}
												</ActionsTableListItem>
											)}
											{!onWeekday ? null : (
												<ActionsTableListItem>
													{__`autoActions.onWeekday ${onWeekday}`}
												</ActionsTableListItem>
											)}
											{!atTime ? null : (
												<ActionsTableListItem>
													{__`autoActions.atTime ${Utc(atTime, 'HH:mm').local().format('HH:mm')}`}
												</ActionsTableListItem>
											)}
											{!filterSegments || !filterSegments.length ? null : (
												<ActionsTableListItem>
													{__n`autoActions.segments ${filterSegments.length}`}{' '}
													{filterSegments.map(({ id, name }, i) => (
														<Link
															key={id}
															to="/segments"
														>
															{name}{i == filterSegments.length - 1 ? '' : ', '}
														</Link>
													))}
												</ActionsTableListItem>
											)}
											{!followupAction || !followupAction.action ? null : (
												<ActionsTableListItem>
													{followupAction.not
														? ds(
															__`autoActions.followupOnNot ${followupActionName} ${followupActionEvent} ${followupActionNotDelay
																? __n`autoActions.inDays ${followupActionNotDelay}`
																: '...'
															}`,
															<Link to={`/actions/auto/${followupActionId}`}/>
														)
														: ds(
															__`autoActions.followupOn ${followupActionName} ${followupActionEvent}`,
															<Link to={`/actions/auto/${followupActionId}`}/>
														)
													}
												</ActionsTableListItem>
											)}
											{!filterTags || !filterTags.length ? null : (
												<ActionsTableListItem>
													{__n`autoActions.tags ${filterTags.length}`}{' '}
													{filterTags.map(({ name }, i) => (
														<Link
															key={i}
															to="/tags"
														>
															{name}{i == filterTags.length - 1 ? '' : ', '}
														</Link>
													))}
												</ActionsTableListItem>
											)}
											{!filterFields ? null : (
												filterFields.map(({ fieldName, type, value }, i) => (
													<ActionsTableListItem key={i}>
														{fieldName} {type} {value}
													</ActionsTableListItem>
												))
											)}
											{!profile.isProcessLimit || !type || type.name != 'send' ? null : (
												<ActionsTableTag color={sendLeftToday > 0 && isActive ? 'success-alt' : 'info'}>
													{profile.limit - sendLeftToday} / {profile.limit} for today
												</ActionsTableTag>
											)}
										</ActionsTableList>
									</ActionsTableCell>
									<ActionsTableCell>
										{isDraft ? null : (
											<Switch
												data-stalk-onclick={`["Activate in list", { "category": "Auto actions", "label": "${isActive ? 'Off' : 'On'}" }]`}
												type="checkbox"
												onChange={this.onActionActiveChange(id)}
												checked={isActive}
											/>
										)}
									</ActionsTableCell>
									<ActionsTableCell>
										<ActionsTableNumber>
											{statEnabled
												? `${Math.floor(metaStat.touch)}%`
												: <span>&mdash;</span>
											}
										</ActionsTableNumber>
									</ActionsTableCell>
									<ActionsTableCell>
										<ActionsTableNumber>
											{statEnabled
												? `${Math.floor(metaStat.involved)}%`
												: <span>&mdash;</span>
											}
										</ActionsTableNumber>
									</ActionsTableCell>
									<ActionsTableCell>
										<ActionsTableNumber>
											{statEnabled
												? `${Math.floor(metaStat.feedback)}%`
												: <span>&mdash;</span>
											}
										</ActionsTableNumber>
									</ActionsTableCell>
									<ActionsTableCell>
										<ActionsTableNumber>
											{statEnabled
												? `${Math.floor(metaStat.blocked)}%`
												: <span>&mdash;</span>
											}
										</ActionsTableNumber>
									</ActionsTableCell>
								</ActionsTableRow>
							);
						})}
					</ActionsTableBody>
				</ActionsTable>
				<footer className="auto-actions-table__footer">
					{count <= pageSize ? null : (
						<Pagination
							className="auto-actions-table__pagination"
							onChange={this.onPageChange()}
							current={pageNum - 1}
							total={Math.ceil(count / pageSize)}
						/>
					)}
					{count <= 10 ? null : (
						<Select
							className="auto-actions-table__select"
							onChange={this.onPerPageChange()}
							value={pageSize}
						>
							<Option value={10}>{__`perPage ${10}`}</Option>
							{count <= 10 ? null : (
								<Option value={25}>{__`perPage ${25}`}</Option>
							)}
							{count <= 25 ? null : (
								<Option value={50}>{__`perPage ${50}`}</Option>
							)}
						</Select>
					)}
				</footer>
				{this.confirmActivationModal()}
			</div>
		);
	}

	confirmActivationModal() {
		return (
			<ConfirmModal
				ref={(ref) => {
					this.confirmActivationModalRef = ref;
				}}
			>
				<ConfirmModalTitle>
					{__`confirmModal.title`}
				</ConfirmModalTitle>
				<ConfirmModalBody>
					<p>
						<b>{__`autoActions.confirmActivation`}</b>
					</p>
					{__`autoActions.confirmActivationDescription`}
				</ConfirmModalBody>
				<ConfirmModalFooter>
					<Button
						color="success"
						autoFocus
					>
						{__`confirmModal.yesButton`}
					</Button>
					<Button
						type="button"
						color="secondary"
					>
						{__`confirmModal.noButton`}
					</Button>
				</ConfirmModalFooter>
			</ConfirmModal>
		);
	}

	onActionActiveChange(id) {
		return async (checked) => {

			if (checked) {

				const change = await this.confirmActivationModalRef.show();

				if (!change) {
					return;
				}
			}

			await this.props.autoActions.saveAction(id, { isActive: checked });
			this.props.notificationsActions.successNotify(__`autoActions.savedNotify`);
		};
	}

	onPageChange() {
		return (page) => {
			this.props.autoActions.setPageNum(page + 1);
		};
	}

	onPerPageChange() {
		return (size) => {
			this.props.autoActions.setPageSize(size);
		};
	}
}
