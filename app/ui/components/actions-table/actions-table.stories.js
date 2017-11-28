import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ActionsTable, {
	ActionsTableHead,
	ActionsTableBody,
	ActionsTableRow,
	ActionsTableCell,
	ActionsTableDraftTag,
	ActionsTableIconMail,
	ActionsTableNameLink,
	ActionsTableSubject,
	ActionsTableTime,
	ActionsTableList,
	ActionsTableListItem,
	ActionsTableTag,
	ActionsTableRecipientsLink,
	ActionsTableNumber
} from './actions-table';
import Switch from '../switch/switch';
import Link from '../link/link';
import IconAnchorArrow from '~/icons/anchor-arrow.svg';

storiesOf('ActionsTable', module)
	.addWithInfo(
		'with rows',
		'This is the basic usage with rows.',
		() => (
			<ActionsTable>
				<ActionsTableHead>
					<ActionsTableRow>
						<ActionsTableCell head>
							Type
						</ActionsTableCell>
						<ActionsTableCell head>
							Action
						</ActionsTableCell>
						<ActionsTableCell colSpan={2} head>
							Conditions
						</ActionsTableCell>
						<ActionsTableCell head>
							Touch
						</ActionsTableCell>
						<ActionsTableCell head>
							Views
						</ActionsTableCell>
						<ActionsTableCell head>
							Feedback
						</ActionsTableCell>
						<ActionsTableCell head>
							Optout
						</ActionsTableCell>
					</ActionsTableRow>
				</ActionsTableHead>
				<ActionsTableBody>
					<ActionsTableRow>
						<ActionsTableCell>
							<ActionsTableIconMail/>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNameLink
								onClick={action('click')}
								href="#"
							>
								Welcome message to new contacts
							</ActionsTableNameLink>
							<ActionsTableSubject>
								{'Lauching today: Beautiful new themes for N1'}
							</ActionsTableSubject>
							<ActionsTableTime>
								11:30 AM, Aug 21, 2015
							</ActionsTableTime>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableList>
								<ActionsTableListItem>
									Send immediately
								</ActionsTableListItem>
								<ActionsTableListItem>
									Segment is <Link onClick={action('click')} href="#">New contacts</Link>
								</ActionsTableListItem>
							</ActionsTableList>
						</ActionsTableCell>
						<ActionsTableCell>
							<Switch
								type="checkbox"
								onChange={action('click')}
								checked
							/>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								891
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								95%
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								80%
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								30%
							</ActionsTableNumber>
						</ActionsTableCell>
					</ActionsTableRow>
					<ActionsTableRow>
						<ActionsTableCell>
							<ActionsTableDraftTag/><br/>
							<ActionsTableIconMail/>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNameLink
								onClick={action('click')}
								href="#"
							>
								Second welcome message to new users
							</ActionsTableNameLink>
							<ActionsTableSubject>
								{'Hello, {{first_name}} Use you aliases with CloudMagic'}
							</ActionsTableSubject>
							<ActionsTableTime>
								11:30 AM, Aug 21, 2015
							</ActionsTableTime>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableList>
								<ActionsTableListItem>
									<Link icon={<IconAnchorArrow/>} onClick={action('click')} href="#">Launching today: Beautiful new so super very long text.</Link>
								</ActionsTableListItem>
								<ActionsTableListItem>
									Send in <Link onClick={action('click')} href="#">2 days</Link> for people who didn’t open
								</ActionsTableListItem>
								<ActionsTableListItem>
									Segment is <Link onClick={action('click')} href="#">Leads</Link>
								</ActionsTableListItem>
								<ActionsTableListItem>
									Tag is <Link onClick={action('click')} href="#">Corporate</Link>
								</ActionsTableListItem>
							</ActionsTableList>
						</ActionsTableCell>
						<ActionsTableCell/>
						<ActionsTableCell>
							<ActionsTableNumber>
								&mdash;
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								&mdash;
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								&mdash;
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								&mdash;
							</ActionsTableNumber>
						</ActionsTableCell>
					</ActionsTableRow>
					<ActionsTableRow>
						<ActionsTableCell>
							<ActionsTableIconMail/>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNameLink
								onClick={action('click')}
								href="#"
							>
								Welcome message to new contacts
							</ActionsTableNameLink>
							<ActionsTableSubject>
								{'Lauching today: Beautiful new themes for N1'}
							</ActionsTableSubject>
							<ActionsTableTime>
								11:30 AM, Aug 21, 2015
							</ActionsTableTime>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableList>
								<ActionsTableListItem>
									Send immediately
								</ActionsTableListItem>
								<ActionsTableListItem>
									Segment is <Link onClick={action('click')} href="#">New contacts</Link>
								</ActionsTableListItem>
							</ActionsTableList>
							<ActionsTableTag color="success-alt">
								123 / 150 for today
							</ActionsTableTag>
						</ActionsTableCell>
						<ActionsTableCell>
							<Switch
								type="checkbox"
								onChange={action('click')}
								checked
							/>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								891
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								95%
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								80%
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								30%
							</ActionsTableNumber>
						</ActionsTableCell>
					</ActionsTableRow>
				</ActionsTableBody>
			</ActionsTable>
		)
	)
	.addWithInfo(
		'with alt rows',
		'This is the basic usage with alt rows.',
		() => (
			<ActionsTable>
				<ActionsTableHead>
					<ActionsTableRow>
						<ActionsTableCell head>
							Type
						</ActionsTableCell>
						<ActionsTableCell head>
							Message
						</ActionsTableCell>
						<ActionsTableCell head>
							Recipients
						</ActionsTableCell>
						<ActionsTableCell head>
							Sent
						</ActionsTableCell>
						<ActionsTableCell head>
							Delivered
						</ActionsTableCell>
						<ActionsTableCell head>
							Opened
						</ActionsTableCell>
						<ActionsTableCell head>
							Clicked
						</ActionsTableCell>
						<ActionsTableCell head>
							Replied
						</ActionsTableCell>
					</ActionsTableRow>
				</ActionsTableHead>
				<ActionsTableBody>
					<ActionsTableRow>
						<ActionsTableCell>
							<ActionsTableIconMail/>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNameLink
								onClick={action('click')}
								href="#"
							>
								Welcome message to new contacts
							</ActionsTableNameLink>
							<ActionsTableSubject>
								{'Lauching today: Beautiful new themes for N1'}
							</ActionsTableSubject>
							<ActionsTableTime>
								6 days ago
							</ActionsTableTime>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableRecipientsLink
								onClick={action('click')}
								href="#"
							>
								242 contacts
							</ActionsTableRecipientsLink>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								891
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								890
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								95%
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								80%
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								30%
							</ActionsTableNumber>
						</ActionsTableCell>
					</ActionsTableRow>
					<ActionsTableRow>
						<ActionsTableCell>
							<ActionsTableDraftTag/><br/>
							<ActionsTableIconMail/>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNameLink
								onClick={action('click')}
								href="#"
							>
								Second welcome message to new users
							</ActionsTableNameLink>
							<ActionsTableSubject>
								{'Hello, {{first_name}} Use you aliases with CloudMagic'}
							</ActionsTableSubject>
							<ActionsTableTime>
								6 days ago
							</ActionsTableTime>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableRecipientsLink
								onClick={action('click')}
								href="#"
							>
								242 contacts
							</ActionsTableRecipientsLink>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								&mdash;
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								&mdash;
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								&mdash;
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								&mdash;
							</ActionsTableNumber>
						</ActionsTableCell>
						<ActionsTableCell>
							<ActionsTableNumber>
								&mdash;
							</ActionsTableNumber>
						</ActionsTableCell>
					</ActionsTableRow>
				</ActionsTableBody>
			</ActionsTable>
		)
	);
