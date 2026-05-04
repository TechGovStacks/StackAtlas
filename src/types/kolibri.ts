import type { DependencyType, ParticipantRole } from './index';

const VALID_PARTICIPANT_ROLES: ParticipantRole[] = ['maintainer', 'contributor', 'funder', 'consumer'];
const VALID_DEPENDENCY_TYPES: DependencyType[] = ['build', 'compiles-to', 'language', 'protocol', 'runtime'];

export function asString(handler: (v: string) => void) {
	return (_e: globalThis.Event, value: unknown) => handler(String(value ?? ''));
}

export function asNullableString(handler: (v: string | null) => void) {
	return (_e: globalThis.Event, value: unknown) => handler(value ? String(value) : null);
}

export function asBoolean(handler: (v: boolean) => void) {
	return (_e: globalThis.Event, value: unknown) => handler(Boolean(value));
}

export function asNullableDependencyType(handler: (v: DependencyType | null) => void) {
	return (_e: globalThis.Event, value: unknown) => {
		if (!value) {
			handler(null);
			return;
		}
		const str = String(value);
		if (VALID_DEPENDENCY_TYPES.includes(str as DependencyType)) {
			handler(str as DependencyType);
		} else {
			handler(null);
		}
	};
}

export function asNullableParticipantRole(handler: (v: ParticipantRole | null) => void) {
	return (_e: globalThis.Event, value: unknown) => {
		if (!value) {
			handler(null);
			return;
		}
		const str = String(value);
		if (VALID_PARTICIPANT_ROLES.includes(str as ParticipantRole)) {
			handler(str as ParticipantRole);
		} else {
			handler(null);
		}
	};
}
