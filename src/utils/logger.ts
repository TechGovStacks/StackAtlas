export const logger = {
	debug: (msg: string, ...args: unknown[]) => {
		if (!import.meta.env.PROD) console.debug(`[StackAtlas] ${msg}`, ...args);
	},
	warn: (msg: string, ...args: unknown[]) => {
		if (!import.meta.env.PROD) console.warn(`[StackAtlas] ${msg}`, ...args);
	},
	error: (msg: string, ...args: unknown[]) => console.error(`[StackAtlas] ${msg}`, ...args),
};
