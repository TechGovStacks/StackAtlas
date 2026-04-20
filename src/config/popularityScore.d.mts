export declare const DEFAULT_METRICS_AGE_FACTOR: number;

export declare function normalizeSignal(value: number, ref: number): number;

export declare function computeRawPopularityScore(metrics: {
	githubStars?: number;
	npmWeeklyDownloads?: number;
	dockerWeeklyPulls?: number;
	pypiWeeklyDownloads?: number;
}): number;

export declare function ageFactor(updatedAt?: string): number;

export declare function computePopularityScore(metrics?: {
	githubStars?: number;
	npmWeeklyDownloads?: number;
	dockerWeeklyPulls?: number;
	pypiWeeklyDownloads?: number;
	updatedAt: string;
}): number | undefined;
