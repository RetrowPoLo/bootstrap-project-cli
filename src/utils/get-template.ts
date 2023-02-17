import chalk from 'chalk';
import fs from 'fs';

import { templates } from '../types';
import { checkTemplateValidity } from './check-template-validity';
import { getCustomTemplatePath, isCustomTemplate } from './custom-template-helpers';

import type { Template } from '../types';

export async function getTemplate(
    rawTemplate?: string
): Promise<Template | undefined> {
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