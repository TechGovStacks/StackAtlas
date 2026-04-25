import { ParticipantRole } from '../types';

export const ROLE_COLORS: Record<ParticipantRole, string> = {
	maintainer: '#1565c0',
	contributor: '#2e7d32',
	funder: '#e65100',
	consumer: '#546e7a',
};

export const PARTICIPANT_ROLES: ParticipantRole[] = ['maintainer', 'contributor', 'funder', 'consumer'];
