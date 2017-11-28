import { combineReducers } from 'redux-immutable';
import contactsState     from './contacts/contacts';
import wizardState       from './wizard/wizard';
import configState       from './config/config';
import autoActionState   from './auto/auto';
import manualActionState from './manual-actions/manual-actions';
import profileState      from './profile/profile';
import logsState         from './logs/logs';
import todoState         from './todo/todo';
import loaderState       from './loader/loader';
import notifications     from './notifications/notifications';

export default combineReducers({
	contactsState,
	wizardState,
	configState,
	autoActionState,
	loaderState,
	profileState,
	logsState,
	todoState,
	manualActionState,
	notifications
});
