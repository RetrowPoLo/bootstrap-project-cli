import path from 'path';

import type { CustomTemplate } from '../types';

export function isCustomTemplate(template: string): template is CustomTemplate {
	return template.toLowerCase().startsWith('file:');
}

export function getCustomTemplatePath(template: CustomTemplate) {
	return path.resolve(process.cwd(), template.replace(/^file:/i, ''));
}
