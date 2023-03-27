# ⚙ Options

## Possible options and value

| Option name                            | Default value | Yes flag passed |
| -------------------------------------- | ------------- | --------------- |
| [git](options.md#git-option)           | false         | true            |
| [husky](options.md#husky-option)       | false         | true            |
| [prettier](options.md#prettier-option) | false         | true            |
| [eslint](options.md#eslint-option)     | false         | true            |
| [install](options.md#install-option)   | true          | true            |
| [template](broken-reference)           | javascript    | You choose one  |

## Git option

The `--git` option initializes a Git repository in your project directory using the `git init` command. This allows you to track changes to your project and collaborate with others using version control.

[Git documentation](https://git-scm.com/docs/git)

## Husky option

The `--husky` option sets up Husky Git hooks in your project directory, which allows you to run custom scripts or commands before or after specific Git events, such as committing code or pushing changes to a remote repository. This can help you ensure that your code meets certain quality or style standards before it's committed or pushed.

[Husky documentation](https://typicode.github.io/husky/#/)

## Prettier option

The `--prettier` option initializes Prettier code formatter in your project directory. Prettier is a tool that automatically formats your code to make it more readable and consistent. You can configure Prettier to follow specific code formatting rules and preferences.

[Prettier documentation](https://prettier.io/docs/en/install.html)

## Eslint option

The `--eslint` option initializes ESLint linter in your project directory. ESLint is a tool that helps you find and fix problems in your JavaScript code by analyzing your code against a set of rules or guidelines. You can customize ESLint to enforce specific coding standards and practices.

[Eslint documentation](https://eslint.org/docs/latest/use/getting-started)

## Install option

The `--install` option automatically installs all the necessary dependencies for your project using the `npm install` command. This saves you time and ensures that all the required packages are installed correctly.

