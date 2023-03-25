import { readFile, writeFile } from 'fs/promises';
import { ESLINT_VERSION } from '../versions';

export async function initEslint(targetDir: string) {
	try {
		// Read the package.json file
		const packageJsonPath = `${targetDir}/package.json`;
		const packageJsonString = await readFile(packageJsonPath, 'utf-8');
		const packageJson = JSON.parse(packageJsonString);

		// Add eslint as a dev dependency
		packageJson.devDependencies = {
			...packageJson.devDependencies,
			eslint: ESLINT_VERSION,
		};

		// Add a command to the package.json to run eslint
		packageJson.scripts = {
			...packageJson.scripts,
			'lint:check': 'eslint ./',
			'lint:fix': 'eslint ./ --fix',
		};

		// Write the updated package.json file
		await writeFile(packageJsonPath, JSON.stringify(packageJson));

		return true;
	} catch (err) {
		console.error(err);
		return Promise.reject(new Error('Failed to initialize eslint'));
	}
}
