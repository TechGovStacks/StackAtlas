import type { ParticipantRole } from './index';

export function asString(handler: (v: string) => void) {
	return (_e: globalThis.Event, value: unknown) => handler(String(value ?? ''));
}

export function asNullableString(handler: (v: string | null) => void) {
	return (_e: globalThis.Event, value: unknown) => handler(value ? String(value) : null);
}

export function asNullableParticipantRole(handler: (v: ParticipantRole | null) => void) {
	return (_e: globalThis.Event, value: unknown) => {
		if (!value) {
			handler(null);
			return;
		}
		const str = String(value);
		if (str === 'maintainer' || str === 'contributor' || str === 'funder' || str === 'consumer') {
			handler(str);
		}
	};
}
