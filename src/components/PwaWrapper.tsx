/**
 * PWA Update Prompt Wrapper
 *
 * This wrapper conditionally imports and renders the PwaUpdatePrompt component
 * only when PWA is enabled, preventing virtual module resolution errors during builds
 * with PWA disabled.
 */

import { lazy, Suspense } from 'preact/compat';

const isPwaEnabled = import.meta.env.VITE_ENABLE_PWA !== 'false';

// Only load the PWA component when PWA is enabled
const PwaUpdatePrompt = isPwaEnabled ? lazy(() => import('./PwaUpdatePrompt').then((m) => ({ default: m.PwaUpdatePrompt }))) : null;

export function PwaWrapper() {
	if (!isPwaEnabled || !PwaUpdatePrompt) {
		return null;
	}

	return (
		<Suspense fallback={null}>
			<PwaUpdatePrompt />
		</Suspense>
	);
}
