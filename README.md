# Bootstrap Project CLI

The Bootstrap Project CLI is a command-line interface tool to help you quickly bootstrap new projects with customizable templates.

## Installation

You can install the Bootstrap Project CLI globally using npm:

```bash
npm install -g bootstrap-project-cli
```

## Usage

To create a new project, run the following command:

```bash
bootstrap-project <project-name>
```

Or just run:

```bash
bootstrap-project
```

To have a help for each steps (with a real wizard 🧙‍♂️), this will let you choose your template, your dependencies.

### Possible options

You can also pass additional options to customize your project using flags:

- --git: Initialize a Git repository
- --husky: Initialize Husky Git hooks
- --prettier: Initialize Prettier code formatter
- --eslint: Initialize Eslint Javascript linter
- --template <template-name>: Choose a project template. The default is JavaScript.
- --yes: Skip prompts and use default options

## Example

For example, to create a new TypeScript project with Git and Husky, you can run:

```bash
bootstrap-project my-typescript-project --git --husky --template typescript
```

Or just run:

```bash
bootstrap-project
```

And you can choose typescript, git and husky in the helping wizard 🧙‍♂️.

## Template

The Bootstrap Project CLI provides several project templates to choose from:

- browser: A template for browser-based projects using vanilla JavaScript and HTML
- javascript: A template for Node.js projects using JavaScript
- typescript: A template for Node.js projects using TypeScript

To choose a template, pass the '--template' flag followed by the name of the template you want to use. The default template is javascript.

## Contributing

Contributions are welcome ! If you want to contribute, please follow these steps:

  1. Fork the repository
  2. Clone the repository to your local machine
  3. Create a new branch for your changes
  4. Make your changes and commit them
  5. Push your changes to your fork
  6. Submit a pull request

Please make sure your code follows the existing coding style before submitting a pull request.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.
