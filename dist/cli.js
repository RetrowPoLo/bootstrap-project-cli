import chalk from 'chalk';
import Listr from 'listr';
import path from 'path';
import { fileURLToPath } from 'url';
import ncp from 'ncp';
import { promisify } from 'util';
import { execa } from 'execa';
import { projectInstall } from 'pkg-install';
import arg from 'arg';
import fs from 'fs';
import inquirer from 'inquirer';

function isCustomTemplate(template) {
	return template.toLowerCase().startsWith('file:');
}
function getCustomTemplatePath(template) {
	return path.resolve(process.cwd(), template.replace(/^file:/i, ''));
}

function getTemplateDirectory(template) {
	const currentFileUrl = import.meta.url;
	if (isCustomTemplate(template)) {
		return getCustomTemplatePath(template);
	}
	return path.resolve(decodeURI(fileURLToPath(currentFileUrl)), '../../templates', template);
}

const copy = promisify(ncp);
async function copyTemplateFiles(templateDir, targetDir) {
	return copy(templateDir, targetDir, { clobber: false });
}

async function createProjectDirectory(projectDir, targetDir) {
	const result = await execa('mkdir', [projectDir], {
		cwd: targetDir,
	});
	if (result.failed) {
		return Promise.reject(new Error('Failed to create directory'));
	}
	return true;
}

async function initGitRepo(targetDir) {
	const result = await execa('git', ['init'], {
		cwd: targetDir,
	});
	if (result.failed) {
		return Promise.reject(new Error('Failed to initialize git'));
	}
	return true;
}

async function initHusky(targetDir) {
	const result = await execa('npx', ['husky-init'], {
		cwd: targetDir,
	});
	if (result.failed) {
		return Promise.reject(new Error('Failed to initialize husky'));
	}
	return true;
}

async function initPrettier(targetDir) {
	const result = await execa('echo', [' {} > .prettierrc.json'], {
		cwd: targetDir,
	});
	if (result.failed) {
		return Promise.reject(new Error('Failed to initialize prettier'));
	}
	return true;
}

function installPackages(targetDir) {
	return projectInstall({
		cwd: targetDir,
	});
}

async function createProject(options) {
	const templateDirectory = getTemplateDirectory(options.template);
	const targetDirectory = path.resolve(process.cwd(), options.project);
	const tasks = new Listr([
		{
			title: 'Create project directory',
			task: () => createProjectDirectory(options.project, process.cwd()),
		},
		{
			title: 'Copy project files',
			task: () => copyTemplateFiles(templateDirectory, targetDirectory),
		},
		{
			title: 'Initialize git',
			task: () => initGitRepo(targetDirectory),
			enabled: () => options.git,
		},
		{
			title: 'Initialize Husky',
			task: () => initHusky(targetDirectory),
			enabled: () => options.husky,
		},
		{
			title: 'Initialize Prettier',
			task: () => initPrettier(targetDirectory),
			enabled: () => options.prettier,
		},
		{
			title: 'Install dependencies',
			task: () => installPackages(targetDirectory),
			skip: () => {
				if (!options.install) {
					return 'Pass --install or -i to automatically install dependencies';
				}
			},
		},
	]);
	try {
		await tasks.run();
		console.log('%s Project ready', chalk.green.bold('DONE'));
	} catch (error) {
		console.log('%s Error occurred', chalk.red.bold('ERROR'));
	}
}

const templates = ['javascript', 'typescript'];

function checkTemplateValidity(template) {
	return (
		typeof template === 'undefined' ||
		template.startsWith('file:') ||
		templates.includes(template)
	);
}

async function getTemplate(rawTemplate) {
	if (typeof rawTemplate === 'undefined') {
		return undefined;
	}
	const template = rawTemplate.toLowerCase();
	const isTemplateValid = checkTemplateValidity(template);
	if (isTemplateValid) {
		if (isCustomTemplate(rawTemplate)) {
			const templatePath = getCustomTemplatePath(rawTemplate);
			try {
				await fs.promises.access(templatePath);
				return rawTemplate;
			} catch (error) {
				console.log(
					`%s There is no such template: ${chalk.white.bgBlack(
						templatePath
					)}. Check the specified path`,
					chalk.yellow.bold('WARNING')
				);
				return undefined;
			}
		}
		return template;
	}
	console.log(
		`%s You passed incorrect template: ${chalk.white.bgBlack(
			rawTemplate
		)}. List of supported templates: ${templates.join(', ')}`,
		chalk.yellow.bold('WARNING')
	);
	console.log(
		`%s For custom templates use this syntax: ${chalk.white.bgBlack(
			'file:./path/to/custom/template'
		)}`,
		chalk.yellow.bold('WARNING')
	);
	return undefined;
}

async function parseArgumentsIntoOptions(rawArgs) {
	const args = arg(
		{
			'--git': Boolean,
			'--husky': Boolean,
			'--prettier': Boolean,
			'--install': Boolean,
			'--template': String,
			'--yes': Boolean,
			'-g': '--git',
			'-h': '--husky',
			'-p': '--prettier',
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
		install: args['--husky'] || args['--prettier'] || args['--install'] || false,
		husky: args['--husky'] || false,
		prettier: args['--prettier'] || false,
		project,
		skipPrompts: args['--yes'] || false,
		template,
	};
}

// default values for unspecified args
const defaultOptions = {
	git: false,
	husky: false,
	prettier: false,
	install: true,
	template: 'javascript',
};
// --yes flag is passed
const skipOptions = {
	git: true,
	husky: true,
	prettier: true,
	install: true,
};
async function promptForMissingOptions(options) {
	if (options.skipPrompts) {
		options = { ...options, ...skipOptions };
	}
	const questions = [];
	if (!options.project) {
		questions.push({
			type: 'input',
			name: 'project',
			/* eslint-disable */
			message: "Please type project's name (cannot be empty)",
			/* eslint-enable */
			validate: (value) => value.length > 0,
		});
	}
	if (!options.template) {
		questions.push({
			type: 'list',
			name: 'template',
			message: 'Please choose which project template to use',
			choices: [
				{ name: 'Browser', value: 'browser' },
				{ name: 'JavaScript', value: 'javascript' },
				{ name: 'TypeScript', value: 'typescript' },
			],
			default: defaultOptions.template,
		});
	}
	if (!options.git) {
		questions.push({
			type: 'confirm',
			name: 'git',
			message: 'Initialize a git repository ?',
			default: defaultOptions.git,
		});
	}
	if (!options.husky) {
		questions.push({
			type: 'confirm',
			name: 'husky',
			message: 'Initialize Husky ?',
			when(answers) {
				return options.git || answers.git;
			},
			default: defaultOptions.husky,
		});
	}
	if (!options.prettier) {
		questions.push({
			type: 'confirm',
			name: 'prettier',
			message: 'Initialize Prettier ?',
			default: defaultOptions.prettier,
		});
	}
	if (!options.install) {
		questions.push({
			type: 'confirm',
			name: 'install',
			message: 'Install packages ?',
			when(answers) {
				if (answers.husky) {
					answers.install = true;
					return false;
				}
				if (answers.prettier) {
					answers.install = true;
					return false;
				}
				return true;
			},
			default: defaultOptions.install,
		});
	}
	const answers = await inquirer.prompt(questions);
	return {
		git: options.git || answers.git,
		husky: options.husky || answers.husky,
		prettier: options.prettier || answers.prettier,
		install: options.install || answers.install,
		project: options.project || answers.project,
		template: options.template || answers.template,
	};
}

async function cli(args) {
	const rawOptions = await parseArgumentsIntoOptions(args);
	const options = await promptForMissingOptions(rawOptions);
	await createProject(options);
}

export { cli };
