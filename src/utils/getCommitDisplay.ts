const LOCAL_COMMIT_FALLBACK = 'lokal';

export function getCommitDisplay(): string {
	const commitSha = import.meta.env.VITE_COMMIT_SHA;
	return commitSha ? commitSha.slice(0, 7) : LOCAL_COMMIT_FALLBACK;
}
