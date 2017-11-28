import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { auto } from '~/actions';
import Filter, {
	FilterFieldset,
	FilterSearch,
	FilterLegend,
	FilterTitle,
	FilterConfigLink,
	FilterItemCheckable,
	FilterItemFolder
} from '~/ui/components/filter';
import './auto-actions-filter.scss';

function mapStateToProps(state) {
	return {
		segments:               state.getIn(['contactsState', 'segments']).toJS(),
		actionCategories:       state.getIn(['configState', 'actionCategories']).toJS(),
		actionFilterSegment:    state.getIn(['autoActionState', 'actionFilterSegment']),
		actionFilterFolder:     state.getIn(['autoActionState', 'actionFilterFolder']),
		actionFolders:          state.getIn(['autoActionState', 'actionFolders']).toJS(),
		actionCategoriesFilter: state.getIn(['autoActionState', 'actionCategoriesFilter']).toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		autoActions: bindActionCreators(auto, dispatch)
	};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AutoActionsFilter extends PureComponent {

	state = {
		searchQuery: ''
	};

	render() {

		const {
			className, segments,
			actionFilterSegment, actionFolders,
			actionFilterFolder, actionCategories,
			actionCategoriesFilter
		} = this.props;

		const {
			searchQuery
		} = this.state;

		return (
			<Filter
				className={classNames(className, 'auto-actions-filter')}
				onSubmit={this.preventDefault()}
			>
				<FilterFieldset>
					<FilterSearch
						data-stalk-onfill='["Search", { "category": "Auto actions" }]'
						onChange={this.onSearchChange()}
						value={searchQuery}
						placeholder={__`actionSearchPlaceholder`}
					/>
				</FilterFieldset>
				<FilterFieldset separated>
					<FilterLegend>
						<FilterTitle>
							<FilterConfigLink to="/segments">
								{__`segmentsTitle`}
							</FilterConfigLink>
						</FilterTitle>
					</FilterLegend>
					{segments.map((segment, i) => (
						<FilterItemCheckable
							key={i}
							type="radio"
							name={`segment-${segment.name}`}
							checked={actionFilterSegment == segment.id}
							onChange={this.onSegmentChange(segment)}
						>
							{segment.name}
						</FilterItemCheckable>
					))}
				</FilterFieldset>
				<FilterFieldset>
					<FilterLegend>
						<FilterTitle>
							<FilterConfigLink to="/folders">
								{__`foldersTitle`}
							</FilterConfigLink>
						</FilterTitle>
					</FilterLegend>
					{actionFolders.map((folder, i) => (
						<FilterItemFolder
							data-stalk-onclick='["Folder", { "category": "Auto actions" }]'
							key={i}
							name={`folder-${folder.name}`}
							checked={actionFilterFolder == folder.id}
							onChange={this.onFolderChange(folder)}
						>
							{folder.name}
						</FilterItemFolder>
					))}
				</FilterFieldset>
				<FilterFieldset>
					<FilterLegend>
						<FilterTitle>
							{__`typesTitle`}
						</FilterTitle>
					</FilterLegend>
					{actionCategories.map((actionCategory, i) => (
						<FilterItemCheckable
							data-stalk-onclick='["Type", { "category": "Auto actions" }]'
							key={i}
							type="checkbox"
							name={`action-category-${actionCategory.name}`}
							checked={actionCategoriesFilter.includes(actionCategory.id)}
							onChange={this.onActionCategoryChange(actionCategory)}
						>
							{actionCategory.name}
						</FilterItemCheckable>
					))}
				</FilterFieldset>
			</Filter>
		);
	}

	preventDefault() {
		return (event) => {
			event.preventDefault();
		};
	}

	onSearchChange() {
		return (searchQuery) => {
			this.props.autoActions.setSearch(searchQuery);
			this.setState({
				...this.state,
				searchQuery
			});
		};
	}

	onSegmentChange(segment) {
		return () => {
			this.props.autoActions.setActionFilterSegment(segment.id);
		};
	}

	onFolderChange(folder) {
		return () => {
			this.props.autoActions.setActionFilterFolder(folder.id);
		};
	}

	onActionCategoryChange(actionCategory) {
		return () => {
			this.props.autoActions.setActionFilterCategories(actionCategory.id);
		};
	}
}
