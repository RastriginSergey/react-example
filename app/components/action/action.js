import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { utc as Utc } from 'moment';
import ds from '~/helpers/decorate-string';
import { capitalize } from '~/helpers';
import { fire } from '~/helpers/stalk';
import { wizard } from '~/actions';
import { testDraftSource } from '~/ui/helpers/draft';
import Link from '~/ui/components/link';
import Button from '~/ui/components/button';
import InputWithVariables from '~/ui/components/input-with-variables';
import ConfirmModal, {
	ConfirmModalTitle,
	ConfirmModalBody,
	ConfirmModalFooter
} from '~/ui/components/confirm-modal';
import MessageEditor, {
	MessageSubjectEditor,
	MessageBodyEditor
} from '~/ui/components/message-editor';
import SelectedContacts, {
	SelectedContactsName,
	SelectedContactsButton
} from '~/ui/components/selected-contacts';
import {
	HeaderBackLink,
	HeaderTitle,
	HeaderNavLink
} from '~/ui/components/header';
import Table, {
	TableHead,
	TableBody,
	TableRow,
	TableCell
} from '~/ui/components/table';
import history from '~/components/router/history';
import CommonShell, {
	CommonShellHeaderLocation,
	CommonShellHeaderNav,
	CommonShellContent
} from '~/components/common-shell';
import ContactsModal from '~/components/contacts-modal';
import ContactsStat from '~/components/contacts-stat';
import variables from '~/variables';
import IconTrash from '~/icons/trash.svg';
import IconMail from '~/icons/mail-line.svg';
import IconPhone from '~/icons/phone.svg';
import IconSkype from '~/icons/skype.svg';
import IconGmail from '~/icons/gmail.svg';
import './action.scss';

const updateCurrentActionStatInterval = 30000; // 30 sec

function dateToString(date) {
	return date
		? Utc(date).local().format('DD.MM.YYYY HH:mm')
		: '';
}

function mapStateToProps(state) {

	const currentAction = state.getIn(['wizardState', 'currentAction']);

	return {
		currentActionEvents: state.getIn(['wizardState', 'currentActionEvents']).toJS(),
		fields:              state.getIn(['contactsState', 'fields']).toJS(),
		sign:                state.getIn(['profileState', 'profile', 'sign']),
		currentAction:       currentAction ? currentAction.toJS() : currentAction
	};
}

function mapDispatchToProps(dispatch) {
	return {
		wizardActions: bindActionCreators(wizard, dispatch)
	};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Action extends PureComponent {

	state = {
		showContactsModal: false,
		infoOrLogs:        true
	};

	updateCurrentActionStatIntervalId = null;

	alertRemoveModalRef = null;
	confirmRemoveModalRef = null;

	render() {

		const { currentAction } = this.props,
			{ infoOrLogs } = this.state;

		return (
			<CommonShell>
				<CommonShellHeaderLocation>
					<HeaderBackLink
						data-stalk-onclick='["Back", { "category": "Auto action" }]'
						to="back"
					/>
					<HeaderTitle withRightOffset>
						{currentAction ? currentAction.name : ''}
					</HeaderTitle>
				</CommonShellHeaderLocation>
				<CommonShellHeaderNav>
					<HeaderNavLink
						data-stalk-onclick='["Info", { "category": "Auto action" }]'
						onClick={this.onInfoOrLogsClick(true)}
						active={infoOrLogs}
					>
						{__`action.infoTab`}
					</HeaderNavLink>
					{currentAction && currentAction.type.name == 'manage' ? null : (
						<HeaderNavLink
							data-stalk-onclick='["Logs", { "category": "Auto action" }]'
							onClick={this.onInfoOrLogsClick(false)}
							active={!infoOrLogs}
						>
							{__`action.logsTab`}
						</HeaderNavLink>
					)}
				</CommonShellHeaderNav>
				<CommonShellContent>
					{this.info()}
					{this.logs()}
					{this.alertRemoveModal()}
					{this.confirmRemoveModal()}
				</CommonShellContent>
			</CommonShell>
		);
	}

	alertRemoveModal() {
		return (
			<ConfirmModal
				ref={(ref) => {
					this.alertRemoveModalRef = ref;
				}}
			>
				<ConfirmModalTitle>
					{__`alertModal.title`}
				</ConfirmModalTitle>
				<ConfirmModalBody>
					{__`action.alertTurnOffAction`}
				</ConfirmModalBody>
				<ConfirmModalFooter>
					<Button
						color="success"
						autoFocus
					>
						{__`alertModal.okButton`}
					</Button>
				</ConfirmModalFooter>
			</ConfirmModal>
		);
	}

	confirmRemoveModal() {

		const { currentAction } = this.props;

		return (
			<ConfirmModal
				ref={(ref) => {
					this.confirmRemoveModalRef = ref;
				}}
			>
				<ConfirmModalTitle>
					{__`confirmModal.title`}
				</ConfirmModalTitle>
				<ConfirmModalBody>
					{ds(currentAction && currentAction.childrenCount
						? __n`action.confirmActionWithChildrenRemove ${currentAction.childrenCount}`
						: __`action.confirmActionRemove`
					)}
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

	info() {

		const { currentAction } = this.props,
			{ infoOrLogs } = this.state;

		return !infoOrLogs || !currentAction ? null : (
			<main className="action">
				<h2 className="action__title">
					{__`action.typeTitle`}: {currentAction.type ? __(currentAction.type.category.name) : ''}{' '}
					&rarr; {currentAction.type ? __(currentAction.type.name) : ''}
				</h2>
				<ContactsStat
					className="action__stat"
					stat={currentAction.stat}
				/>
				{this.actionProps()}
				{this.selectedContacts()}
				{this.comment()}
				{this.email()}
				<div className="action__row">
					<Button
						color="info"
						icon={<IconTrash/>}
						onClick={this.onRemoveActionClick()}
					>
						{__`action.removeButton`}
					</Button>
				</div>
			</main>
		);
	}

	logs() {

		const { currentAction, currentActionEvents } = this.props,
			{ infoOrLogs } = this.state;

		return infoOrLogs || !currentAction ? null : (
			<main className="action action--full-width">
				<div className="action__row">
					<Table>
						<TableHead>
							<TableRow>
								<TableCell head>
									{__`action.columnTime`}
								</TableCell>
								<TableCell head>
									{__`action.columnEvent`}
								</TableCell>
								<TableCell head>
									{__`action.columnAction`}
								</TableCell>
								<TableCell head/>
								<TableCell head>
									{__`action.columnActionFolder`}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{currentActionEvents.map(({
								createdAt, eventType,
								action
							}, i) => {

								let typeIcon = null;

								switch (action.actionCategory) {

									case 'Phone':
										typeIcon = (
											<IconPhone className="action__event-icon"/>
										);
										break;

									case 'Email':
										typeIcon = (
											<IconMail className="action__event-icon"/>
										);
										break;

									case 'Skype':
										typeIcon = (
											<IconSkype className="action__event-icon"/>
										);
										break;

									default:
										typeIcon = null;
										break;
								}

								return (
									<TableRow key={i}>
										<TableCell>
											<span className="action__event-time">
												{dateToString(createdAt)}
											</span>
										</TableCell>
										<TableCell>
											{typeIcon} {__(capitalize(eventType.name))}
										</TableCell>
										<TableCell>
											<Link
												className="action__event-link"
												to={`/actions/${action.type}/${action.id}`}
											>
												{action.name}
											</Link>
										</TableCell>
										<TableCell>
											<IconGmail className="action__event-icon"/>
										</TableCell>
										<TableCell>
											{action.folder}
										</TableCell>
									</TableRow>
								);

							})}
						</TableBody>
					</Table>
				</div>
			</main>
		);
	}

	actionProps() {

		const { currentAction: {
			actionCondition, startDate,
			stopDate, inDays,
			onWeekday, atTime,
			inHours
		} } = this.props;

		const withDelay = inDays || onWeekday || atTime || inHours;

		return (
			<div className="action__props action__row">
				{!actionCondition ? null : (
					<div className="action__prop">
						<div className="action__prop-name">
							{__`action.followupAction`}:
						</div>
						<div className="action__prop-value">
							{actionCondition.action.name}
						</div>
					</div>
				)}
				<div className="action__prop">
					<div className="action__prop-name">
						{__`action.startDate`}:
					</div>
					<div className="action__prop-value">
						{dateToString(startDate)}
					</div>
				</div>
				{!actionCondition ? null : (
					<div className="action__prop">
						<div className="action__prop-name">
							{__`action.contactsWho`}:
						</div>
						<div className="action__prop-value">
							{actionCondition.eventConditions.map((_, i) => (
								<span key={i}>
									{i == 0 ? '' : ', '}{__(`${_.has ? 'not ' : ''}${_.event.name}`)}
								</span>
							))}
						</div>
					</div>
				)}
				{!stopDate ? null : (
					<div className="action__prop">
						<div className="action__prop-name">
							{__`action.stopDate`}:
						</div>
						<div className="action__prop-value">
							{dateToString(stopDate)}
						</div>
					</div>
				)}
				{!withDelay ? null : (
					<div className="action__prop">
						<div className="action__prop-name">
							{__`action.delay`}:
						</div>
						<div className="action__prop-value">
							{!inDays ? null : `${__n`action.inDays ${inDays}`} `}
							{!inHours ? null : `${__n`action.inHours ${inHours}`} `}
							{!onWeekday ? null : `${__`action.onWeekday ${onWeekday}`} `}
							{!atTime ? null : __`action.atTime ${Utc(atTime, 'HH:mm').local().format('HH:mm')}`}
						</div>
					</div>
				)}
			</div>
		);
	}

	selectedContacts() {

		const { currentAction, params } = this.props,
			{ showContactsModal } = this.state;

		const { isActive } = currentAction,
			isManualAction = params.actionType == 'manual';

		return (
			<div className="action__row">
				<SelectedContacts
					data-stalk-onclick='["Contacts list", { "category": "Auto action" }]'
					label={__`action.selectContactsLabel`}
					placeholder={__`action.selectContactsPlaceholder`}
					onClick={this.onContactsModalToggle()}
				>
					<SelectedContactsName>
						{__`action.selectedContactsName`}
					</SelectedContactsName>
					<SelectedContactsButton
						color={isActive ? 'success' : 'info'}
						count={currentAction.count}
					>
						{isActive ? __`action.inProgress` : __`action.isStopped`}
					</SelectedContactsButton>
				</SelectedContacts>
				<ContactsModal
					onHide={this.onContactsModalToggle()}
					show={showContactsModal}
					hideDescription={isManualAction}
					readOnly
				/>
			</div>
		);
	}

	comment() {

		const { currentAction: {
			type, message: { variants: [{ subject }] }
		} } = this.props;

		return type.name != 'call' ? null : (
			<div className="action__row">
				<InputWithVariables
					variableNames={variables}
					value={subject || ''}
					readOnly
				/>
			</div>
		);
	}

	email() {

		const {
			currentAction: {
				type, message: { variants: [{ subject, body, bodySource }] }
			},
			sign
		} = this.props;

		return type.name != 'send' ? null : (
			<div className="action__row">
				<MessageEditor
					variableNames={variables}
					readOnly
				>
					<MessageSubjectEditor
						label={__`action.subjectLabel`}
						value={subject || ''}
					/>
					<MessageBodyEditor
						value={testDraftSource(bodySource, body)}
						sign={sign}
					/>
				</MessageEditor>
			</div>
		);
	}

	componentWillMount() {

		const { actionType, actionId } = this.props.params;

		this.props.wizardActions.viewAction(actionType, actionId);

		this.updateCurrentActionStatIntervalId = setInterval(() => {

			const { actionType, actionId } = this.props.params;

			this.props.wizardActions.updateCurrentActionStat(actionType, actionId);

		}, updateCurrentActionStatInterval);
	}

	componentWillUnmount() {
		clearInterval(this.updateCurrentActionStatIntervalId);
	}

	onInfoOrLogsClick(infoOrLogs) {
		return () => {
			this.setState({
				...this.state,
				infoOrLogs
			});
		};
	}

	onContactsModalToggle() {
		return () => {

			const { showContactsModal } = this.state;

			this.setState({
				...this.state,
				showContactsModal: !showContactsModal
			});
		};
	}

	onRemoveActionClick() {
		return async () => {

			const { actionType, actionId } = this.props.params,
				{ currentAction } = this.props,
				{ alertRemoveModalRef, confirmRemoveModalRef } = this;

			if (currentAction.isActive && actionType == 'auto') {
				await alertRemoveModalRef.show();
			} else {

				const remove = await confirmRemoveModalRef.show();

				if (remove) {
					this.props.wizardActions.deleteAction(actionType, actionId);
					fire('Delete', { category: 'Auto action' });
					history.push(`/actions/${actionType}`);
				}
			}
		};
	}
}
