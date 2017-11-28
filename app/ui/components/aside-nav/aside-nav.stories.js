import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconLogo from '~/icons/logo.svg';
import IconContact from '~/icons/contact.svg';
import IconBolt from '~/icons/bolt.svg';
import IconPaper from '~/icons/paper.svg';
import IconEye from '~/icons/eye.svg';
import IconTodo from '~/icons/todo.svg';
import IconLogout from '~/icons/logout.svg';
import AsideNav, {
	AsideNavGroup,
	AsideNavLink
} from './aside-nav';

storiesOf('AsideNav', module)
	.addWithInfo(
		'with basic content',
		'This is the basic usage with basic content.',
		() => (
			<AsideNav
				style={{
					width:  '8em',
					height: '80em'
				}}
			>
				<AsideNavGroup placement="top">
					<AsideNavLink
						onClick={action('click')}
						icon={<IconLogo/>}
						primary
					/>
					<AsideNavLink
						onClick={action('click')}
						icon={<IconContact/>}
					>
						Contacts
					</AsideNavLink>
					<AsideNavLink
						onClick={action('click')}
						icon={<IconBolt/>}
					>
						Auto<br/>actions
					</AsideNavLink>
					<AsideNavLink
						onClick={action('click')}
						icon={<IconPaper/>}
						active
					>
						Manual<br/>messages
					</AsideNavLink>
					<AsideNavLink
						onClick={action('click')}
						icon={<IconEye/>}
					>
						Events
					</AsideNavLink>
					<AsideNavLink
						onClick={action('click')}
						icon={<IconTodo/>}
					>
						To-do
					</AsideNavLink>
				</AsideNavGroup>
				<AsideNavGroup placement="bottom">
					<AsideNavLink
						onClick={action('click')}
						icon={<IconLogout/>}
					/>
				</AsideNavGroup>
			</AsideNav>
		)
	)
	.add(
		'live example',
		() => (
			<Demo/>
		)
	);

class Demo extends Component {

	state = {
		tab: 0
	}

	render() {

		const { tab } = this.state;

		return (
			<AsideNav
				style={{
					width:  '8em',
					height: '80em'
				}}
			>
				<AsideNavGroup>
					<AsideNavLink
						active={tab == 0}
						onClick={() => this.setState({ tab: 0 })}
						icon={<IconLogo/>}
						primary
					/>
					<AsideNavLink
						active={tab == 1}
						onClick={() => this.setState({ tab: 1 })}
						icon={<IconContact/>}
					>
						Contacts
					</AsideNavLink>
					<AsideNavLink
						active={tab == 2}
						onClick={() => this.setState({ tab: 2 })}
						icon={<IconBolt/>}
					>
						Auto<br/>actions
					</AsideNavLink>
					<AsideNavLink
						active={tab == 3}
						onClick={() => this.setState({ tab: 3 })}
						icon={<IconPaper/>}
					>
						Manual<br/>messages
					</AsideNavLink>
					<AsideNavLink
						active={tab == 4}
						onClick={() => this.setState({ tab: 4 })}
						icon={<IconEye/>}
					>
						Events
					</AsideNavLink>
					<AsideNavLink
						active={tab == 5}
						onClick={() => this.setState({ tab: 5 })}
						icon={<IconTodo/>}
					>
						To-do
					</AsideNavLink>
				</AsideNavGroup>
				<AsideNavGroup placement="bottom">
					<AsideNavLink
						onClick={action('click')}
						icon={<IconLogout/>}
					/>
				</AsideNavGroup>
			</AsideNav>
		);
	}
}
