import path from 'path';
import { fileURLToPath } from 'url';

import { getCustomTemplatePath, isCustomTemplate } from './custom-template-helpers';

import type { Template } from '../types';

export function getTemplateDirectory(template: Template): string {
    const currentFileUrl = import.meta.url;

    if (isCustomTemplate(template)) {
        return getCustomTemplatePath(template);
    }

    return path.resolve(
        decodeURI(fileURLToPath(currentFileUrl)),
        '../../templates',
        template
    );
}