import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ds from '~/helpers/decorate-string';
import { auto, wizard } from '~/actions';
import Link from '~/ui/components/link';
import Button from '~/ui/components/button';
import NotificationPanel, {
	NotificationPanelLink
} from '~/ui/components/notification-panel';
import {
	HeaderTitle,
	HeaderNavLink,
	HeaderNavCounter
} from '~/ui/components/header';
import CommonShell, {
	CommonShellHeaderLocation,
	CommonShellHeaderNav,
	CommonShellContent
} from '~/components/common-shell';
import AutoActionsFilter from '~/components/auto-actions-filter';
import AutoActionsTable from '~/components/auto-actions-table';
import IconPlus from '~/icons/plus.svg';
import './auto-actions.scss';

function mapStateToProps(state) {

	const filterSegment = state.getIn(['autoActionState', 'actionFilterSegment']),
		filterFolder = state.getIn(['autoActionState', 'actionFilterFolder']),
		filter = state.getIn(['autoActionState', 'filter']);

	return {
		filter:        filter ? filter.toJS() : filter,
		count:         state.getIn(['autoActionState', 'count']),
		draft:         state.getIn(['autoActionState', 'draft']),
		active:        state.getIn(['autoActionState', 'active']),
		pause:         state.getIn(['autoActionState', 'pause']),
		profile:       state.getIn(['profileState', 'profile']).toJS(),
		filterSegment: filterSegment
			? state.getIn(['contactsState', 'segments']).find(_ =>
				_.get('id') === filterSegment
			).toJS()
			: null,
		filterFolder:  filterFolder
			? state.getIn(['autoActionState', 'actionFolders']).find(_ =>
				_.get('id') === filterFolder
			).toJS()
			: null
	};
}

function mapDispatchToProps(dispatch) {
	return {
		autoActions:   bindActionCreators(auto, dispatch),
		wizardActions: bindActionCreators(wizard, dispatch)
	};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AutoActions extends PureComponent {

	render() {

		const {
			filter, active,
			pause, draft,
			profile, count
		} = this.props;

		return (
			<CommonShell currentPage="actions">
				<CommonShellHeaderLocation>
					<HeaderTitle>
						{__`autoActions.title`}
					</HeaderTitle>
				</CommonShellHeaderLocation>
				<CommonShellHeaderNav>
					<HeaderNavLink
						data-stalk-onclick='["All actions", { "category": "Auto actions" }]'
						onClick={this.onNavClick(null)}
						active={!filter}
					>
						{__`autoActions.allTab`} <HeaderNavCounter count={active + pause + draft}/>
					</HeaderNavLink>
					<HeaderNavLink
						data-stalk-onclick='["Active", { "category": "Auto actions" }]'
						onClick={this.onNavClick({ isActive: true })}
						active={filter && filter.isActive}
					>
						{__`autoActions.activeTab`} <HeaderNavCounter count={active}/>
					</HeaderNavLink>
					<HeaderNavLink
						data-stalk-onclick='["On pause", { "category": "Auto actions" }]'
						onClick={this.onNavClick({ isActive: false })}
						active={filter && !filter.isActive && !filter.isDraft}
					>
						{__`autoActions.onPauseTab`} <HeaderNavCounter count={pause}/>
					</HeaderNavLink>
					<HeaderNavLink
						data-stalk-onclick='["Drafts", { "category": "Auto actions" }]'
						onClick={this.onNavClick({ isDraft: true })}
						active={filter && filter.isDraft}
					>
						{__`autoActions.draftsTab`} <HeaderNavCounter count={draft}/>
					</HeaderNavLink>
				</CommonShellHeaderNav>
				<CommonShellContent>
					<main className="auto-actions">
						<AutoActionsFilter
							className="auto-actions__filter"
						/>
						{profile.gmailSendLeft != 0 ? null : (
							<NotificationPanel className="auto-actions__sending-limit">
								{ds(
									__`autoActions.limitIsReached`,
									<NotificationPanelLink to="/limits"/>,
									<NotificationPanelLink to="/billing"/>
								)}
							</NotificationPanel>
						)}
						<h2 className="auto-actions__available-messages">
							{__`autoActions.availableMessages`}: <span className="auto-actions__send-left">{profile.gmailSendLeft}</span> / {profile.gmailLimits}
						</h2>
						<p className="auto-actions__note">
							{ds(__`autoActions.note`, <b/>)}
						</p>
						<div className="auto-actions__top">
							<h2 className="auto-actions__title">
								{this.title()}
							</h2>
							<Link
								data-stalk-onclick='["Create auto action", { "category": "Auto actions" }]'
								to="/wizard"
								disguise
							>
								<Button
									color="success"
									icon={<IconPlus/>}
								>
									{__`autoActions.createButton`}
								</Button>
							</Link>
						</div>
						<AutoActionsTable
							className="auto-actions__table"
						/>
						{count ? null : (
							this.placeholder()
						)}
					</main>
				</CommonShellContent>
			</CommonShell>
		);
	}

	title() {

		const { filterSegment, filterFolder } = this.props;

		if (filterSegment) {
			return __`autoActions.tableTitleInSegment ${filterSegment.name}`;
		}

		if (filterFolder) {
			return __`autoActions.tableTitleInFolder ${filterFolder.name}`;
		}

		return __`autoActions.tableTitle`;
	}

	placeholder() {
		return (
			<div className="auto-actions__placeholder">
				<h2 className="auto-actions__placeholder-title">
					{__`autoActions.placeholderTitle`}
				</h2>
				<Link
					to="/wizard"
					disguise
				>
					<Button
						className="auto-actions__placeholder-button"
						color="success"
						icon={<IconPlus/>}
					>
						{__`autoActions.placeholderButton`}
					</Button>
				</Link>
			</div>
		);
	}

	componentWillMount() {
		this.props.autoActions.loadActions();
		this.props.autoActions.loadFolders();
		this.props.wizardActions.reset();
		this.props.wizardActions.clearFollowupFilter();
	}

	onNavClick(filter) {
		return () => {
			this.props.autoActions.setFilter(filter);
		};
	}
}
