import { createProject } from './main';
import { parseArgumentsIntoOptions } from './utils/parse-arguments-into-options';
import { promptForMissingOptions } from './utils/prompt-for-missing-options';

import type { Args } from './types';

export async function cli(args: Args) {
	const rawOptions = await parseArgumentsIntoOptions(args);

	const options = await promptForMissingOptions(rawOptions);

	await createProject(options);
}
