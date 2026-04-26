import { z } from 'zod';
import { logger } from './logger';

export function safeJsonParse<T>(raw: string | null, schema: z.ZodType<T>): T | null {
	if (!raw) return null;
	try {
		const result = schema.safeParse(JSON.parse(raw));
		if (!result.success) {
			logger.warn('safeJsonParse: validation failed', result.error.issues);
			return null;
		}
		return result.data;
	} catch {
		return null;
	}
}
