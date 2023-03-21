import { readFile, writeFile } from 'fs/promises';
import { PRETTIER_VERSION } from '../versions';

export async function initPrettier(targetDir: string) {
	// Config for the .prettierrc.json file
	const prettierConfig = {
		trailingComma: 'es5',
		useTabs: true,
		tabWidth: 4,
		semi: true,
		singleQuote: true,
		printWidth: 100,
		bracketSameLine: true,
	};

	// Config for the .prettierignore file
	const prettierignoreConfig = ['node_modules', 'vscode', 'package-lock.json'].join('\n');

	try {
		// Prettier config file creation
		await writeFile(`${targetDir}/.prettierrc.json`, JSON.stringify(prettierConfig));

		// Prettier ignore file creation
		await writeFile(`${targetDir}/.prettierignore`, prettierignoreConfig);

		// Read the package.json file
		const packageJsonPath = `${targetDir}/package.json`;
		const packageJsonString = await readFile(packageJsonPath, 'utf-8');
		const packageJson = JSON.parse(packageJsonString);

		// Add prettier as a dev dependency
		packageJson.devDependencies = {
			...packageJson.devDependencies,
			prettier: PRETTIER_VERSION,
		};

		// Add a command to the package.json to run prettier
		packageJson.scripts = {
			...packageJson.scripts,
			prettier: 'prettier --write .',
		};

		// Write the updated package.json file
		await writeFile(packageJsonPath, JSON.stringify(packageJson));

		return true;
	} catch (err) {
		console.error(err);
		return Promise.reject(new Error('Failed to initialize prettier'));
	}
}
