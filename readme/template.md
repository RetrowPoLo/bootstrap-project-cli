# 📚 Template

You can choose a template by passing the `--template` flag followed by the name of the template you want to use. The default template is `JavaScript`.

## Browser template

The browser template comes with a pre-built version of a site with links to the CSS and JS files already created. This is useful for quickly prototyping a static website or experimenting with front-end code.

```text
├── Assets
    ├── Css
        └── style.css
    └── Javascript
        └── index.js
├── index.html
└── package.json
```

## Javascript template

The JavaScript template comes with an `index.js` file inside an `src` folder and a `package.json`. This is the default template when the `--yes` flag is given.

```text
├── src
    └── index.js
└── package.json
```

## Typescript template

The TypeScript template comes with an `index.ts` file inside an `src` folder and a `package.json`. This is a good option if you prefer using TypeScript in your Node.js projects.

```text
├── src
    └── index.ts
├── package.json
└── tsconfig.json
```
