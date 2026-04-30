import type { Location, Page, TestInfo, expect as playwrightExpect, test as playwrightTest } from '@playwright/test';
import { createRequire } from 'node:module';

type PlaywrightExpect = typeof playwrightExpect;
type PlaywrightTest = typeof playwrightTest;
type E2eTestBody = (args: { page: Page }, testInfo: TestInfo) => Promise<void> | void;
type PlaywrightTestType = {
	_createTest?: (type: 'default', location: Location, title: string, body: E2eTestBody) => void;
};
type PlaywrightTestWithInternals = PlaywrightTest & Record<symbol, PlaywrightTestType | undefined>;
type WrapFunctionWithLocation = <Args extends unknown[], ReturnValue>(
	callback: (location: Location, ...args: Args) => ReturnValue,
) => (...args: Args) => ReturnValue;

let registeredPlaywrightTest: PlaywrightTest | undefined;
const require = createRequire(import.meta.url);

function isUnexpectedRegistrationError(error: unknown): boolean {
	return error instanceof Error && error.message.includes('Playwright Test did not expect');
}

function getPlaywrightTestType(testFunction: PlaywrightTest): PlaywrightTestType | undefined {
	const testTypeSymbol = Object.getOwnPropertySymbols(testFunction).find((symbol) => symbol.description === 'testType');
	return testTypeSymbol ? (testFunction as PlaywrightTestWithInternals)[testTypeSymbol] : undefined;
}

function getActivePlaywrightTest(): PlaywrightTest | undefined {
	for (const [modulePath, module] of Object.entries(require.cache)) {
		if (!modulePath.endsWith('/playwright/lib/common/globals.js')) {
			continue;
		}

		const globals = module.exports as { currentlyLoadingFileSuite?: () => unknown };
		if (!globals.currentlyLoadingFileSuite?.()) {
			continue;
		}

		const testPath = modulePath.replace('/playwright/lib/common/globals.js', '/playwright/test.js');
		const testModule = require(testPath) as { test?: PlaywrightTest };
		if (testModule.test) {
			return testModule.test;
		}
	}

	return undefined;
}

function getWrapFunctionWithLocation(): WrapFunctionWithLocation | undefined {
	for (const [modulePath, module] of Object.entries(require.cache)) {
		if (modulePath.endsWith('/playwright/lib/transform/transform.js')) {
			return (module.exports as { wrapFunctionWithLocation?: WrapFunctionWithLocation }).wrapFunctionWithLocation;
		}
	}

	return undefined;
}

function getCurrentPlaywrightTest(): PlaywrightTest | undefined {
	return getActivePlaywrightTest() ?? registeredPlaywrightTest;
}

function registerTest(location: Location, title: string, body: E2eTestBody): void {
	try {
		const currentTest = getCurrentPlaywrightTest();
		const testType = currentTest ? getPlaywrightTestType(currentTest) : undefined;
		registeredPlaywrightTest = currentTest;

		if (testType?._createTest) {
			testType._createTest('default', location, title, body);
		}
	} catch (error) {
		if (!isUnexpectedRegistrationError(error)) {
			throw error;
		}
	}
}

const unavailableExpect = (() => {
	throw new Error('Playwright expect is only available while Playwright is running tests.');
}) as PlaywrightExpect;

export const expect = new Proxy(unavailableExpect, {
	get(target, property, receiver) {
		return Reflect.get(getCurrentPlaywrightTest()?.expect ?? target, property, receiver);
	},
	apply(target, thisArgument, argumentsList) {
		return Reflect.apply(getCurrentPlaywrightTest()?.expect ?? target, thisArgument, argumentsList);
	},
}) as PlaywrightExpect;

export const test = (
	getWrapFunctionWithLocation() ??
	((callback) =>
		(...args) =>
			callback({ column: 0, file: '', line: 0 }, ...args))
)(registerTest);
export type { Page };
