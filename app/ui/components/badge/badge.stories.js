import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Badge, { BadgeContainer } from './badge';
import Link     from '../link/link';
import IconMail from '~/icons/mail.svg';
import IconCard from '~/icons/card.svg';

storiesOf('Badge', module)
	.addWithInfo(
		'with number',
		'This is the basic usage with providing a badge to show the number.',
		() => (
			<BadgeContainer>
				<Link
					href="#"
					onClick={action('click')}
					icon={<IconMail width={23}/>}
					iconOnly
				>
					<Badge label={200}/>
				</Link>
			</BadgeContainer>
		)
	)
	.addWithInfo(
		'with long number',
		'This is the basic usage with providing a badge to show the long number.',
		() => (
			<BadgeContainer>
				<Link
					href="#"
					onClick={action('click')}
					icon={<IconCard width={23}/>}
					iconOnly
				>
					<Badge label={1785}/>
				</Link>
			</BadgeContainer>
		)
	);
