import arg from 'arg';

import { getTemplate } from './get-template';

import type { Args, RawOptions } from '../types';

export async function parseArgumentsIntoOptions(rawArgs: Args): Promise<RawOptions> {
	const args = arg(
		{
			'--git': Boolean,
			'--husky': Boolean,
			'--prettier': Boolean,
			'--eslint': Boolean,
			'--install': Boolean,
			'--template': String,
			'--yes': Boolean,
			'-g': '--git',
			'-h': '--husky',
			'-p': '--prettier',
			'-e': '--eslint',
			'-i': '--install',
			'-t': '--template',
			'-y': '--yes',
		},
		{
			argv: rawArgs.slice(2),
		}
	);

	const rawTemplate = args['--template'];
	const template = await getTemplate(rawTemplate);

	const project = args._[0];

	return {
		git: args['--husky'] || args['--git'] || false,
		install:
			args['--husky'] || args['--prettier'] || args['--eslint'] || args['--install'] || false,
		husky: args['--husky'] || false,
		prettier: args['--prettier'] || false,
		eslint: args['--eslint'] || false,
		project,
		skipPrompts: args['--yes'] || false,
		template,
	};
}
