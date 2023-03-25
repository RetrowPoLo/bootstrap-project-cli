export const templates = ['javascript', 'typescript', 'browser'] as const;

export type Args = string[];
export type SupportedTemplate = (typeof templates)[number];
export type CustomTemplate = `file:${string}`;
export type Template = SupportedTemplate | CustomTemplate;

export type RawOptions = {
	git: boolean;
	husky: boolean;
	prettier: boolean;
	eslint: boolean;
	install: boolean;
	project: string;
	skipPrompts: boolean;
	template?: Template;
};

export type Options = Omit<RawOptions, 'skipPrompts'> & {
	template: Template;
};
