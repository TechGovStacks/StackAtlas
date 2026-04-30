import { describe, expect, it } from 'vitest';
import { getScoreCategory, getScoreCategoryColor, getScorePercentileInCategory } from '../sovereigntyScore.js';

describe('getScoreCategory', () => {
	it('maps integer category boundaries', () => {
		expect(getScoreCategory(0)).toBe('insufficient');
		expect(getScoreCategory(30)).toBe('insufficient');
		expect(getScoreCategory(31)).toBe('minimal');
		expect(getScoreCategory(45)).toBe('minimal');
		expect(getScoreCategory(46)).toBe('adequate');
		expect(getScoreCategory(60)).toBe('adequate');
		expect(getScoreCategory(61)).toBe('good');
		expect(getScoreCategory(75)).toBe('good');
		expect(getScoreCategory(76)).toBe('excellent');
		expect(getScoreCategory(90)).toBe('excellent');
		expect(getScoreCategory(91)).toBe('outstanding');
		expect(getScoreCategory(100)).toBe('outstanding');
	});

	it('maps decimal stack averages without falling back to insufficient', () => {
		expect(getScoreCategory(30.1)).toBe('minimal');
		expect(getScoreCategory(45.1)).toBe('adequate');
		expect(getScoreCategory(60.1)).toBe('good');
		expect(getScoreCategory(75.1)).toBe('excellent');
		expect(getScoreCategory(90.1)).toBe('outstanding');
		expect(getScoreCategoryColor(90.1)).toBe('#1B5E20');
	});
});

describe('getScorePercentileInCategory', () => {
	it('calculates percentiles for decimal values in continuous category ranges', () => {
		expect(getScorePercentileInCategory(90)).toBe(100);
		expect(getScorePercentileInCategory(90.1)).toBe(1);
		expect(getScorePercentileInCategory(100)).toBe(100);
	});
});
