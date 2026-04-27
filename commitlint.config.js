export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'body-max-line-length': [0],
		'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'ci']],
		'subject-case': [0],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'type-case': [2, 'always', 'lowercase'],
		'type-empty': [2, 'never'],
	},
};
