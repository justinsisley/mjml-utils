# mjml-utils

[![licence mit](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/justinsisley/mjml-utils/blob/master/LICENSE.md)

The utility belt for [MJML](https://mjml.io/) developers

## Installation

Installing globally is the easiest way to get started, since you won't need any project-specific setup:

```bash
npm install -g mjml-utils
```

Installing as a local dev-dependency gives you more flexibility:

```bash
npm install -D mjml-utils
```

If you install __mjml-utils__ locally, you'll probably want to configure it to run via your `package.json` scripts. This method is encouraged, and an example of local usage via `package.json` scripts is provided [below](#npm-script-usage).

## Global Usage

#### --build

The `mju --build` command compiles all MJML templates into HTML templates.

```bash
mju --build -i ./templates -o ./build
```

The `--build` command requires input (`-i`) and output (`-o`) arguments. `-i` is the directory in which your raw MJML templates are located, and `-o` is the directory you would like the compiled HTML files written to.
With the optional extension (`-e`) argument you can specify the output file extension (default: `.html`) to your liking.

```bash
mju --build -i ./templates -o ./build -e .handlebars
```

#### --watch

The `mju --watch` command will monitor all MJML templates in a specified directory and compile them to HTML every time they're modified.

```bash
mju --watch -i ./templates -o ./build
```

Like the `--build` command, the `--watch` command requires both input (`-i`) and output (`-o`) arguments.

#### --send

The `mju --send` command sends compiled MJML templates as HTML emails to a recipient of your choosing using your Gmail credentials.

```bash
mju --send -o ./build
```

The `--send` command will prompt you to provide all of the information needed to send test emails.

## NPM Script Usage

If you'd prefer to install __mjml-utils__ locally, you can easily tailor its commands specifically for your project.

For example, if your project contains MJML email templates in the `./templates/email` directory, and you'd like to compile them to the `./build/templates/email` directory, you might configure your `package.json` file like this:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "email-build": "mju --build -i ./templates/email -o ./build/templates/email",
    "email-watch": "mju --watch -i ./templates/email -o ./build/templates/email",
    "email-send": "mju --send -o ./build/templates/email"
  },
  "dependencies": {
    "mjml": "*",
    "mjml-utils": "*"
  }
}
```

The above configuration would allow you to run the following commands from the command line:

```bash
npm run email-build
npm run email-watch
npm run email-send
```

This is the preferred way of using __mjml-utils__, since you can configure it on a per-project basis, and you won't have to remember any command line arguments other than the simple NPM script alias.

## Module Usage

__mjml-utils__ also has a few built-in helper functions.

#### inject()

Inject variables into your email templates.

Usage:

```javascript
const mjmlUtils = require('mjml-utils');
const pathToHtmlEmailTemplate = path.join(__dirname, '../emails/welcome.html');

mjmlUtils.inject(pathToHtmlEmailTemplate, {
  name: 'bob',
  profileURL: 'https://app.com/bob',
})
.then(finalTemplate => {
  // finalTemplate is an HTML string containing the template with all occurrences
  // of `{name}` replaced with "bob", and all occurrences of `{profileURL}`
  // replaced with "https://app.com/bob".
});
```

The above JavaScript assumes a template called `welcome.html` exists at the specified path, and that it's contents are something like the following example:

```html
<html>
  <body>
    <h1>Welcome {name}</h1>

    <p><a href="{profileURL}">Click here</a> to view your profile.</p>
  </body>
</html>
```

This means your raw MJML template should contain the necessary template strings that you intend to replace with dynamic values.

#### sendmail()

Inject variables, compose, and send an email in one step.

Usage (using nodemailer SES transport):

```javascript
const mjmlUtils = require('mjml-utils');
const pathToHtmlEmailTemplate = path.join(__dirname, '../emails/welcome.html');

mjmlUtils.sendmail.config({
  fromAddress: 'you@domain.com',
  transporter: nodemailer.createTransport(sesTransport({
    accessKeyId,
    secretAccessKey,
    region,
  })),
});

mjmlUtils.sendmail({
  to: 'someone@domain.com',
  subject: 'Custom transactional email made easy!',
  text: 'If the HTML email doesn\'t show up, this text should help you out.',
  template: pathToHtmlEmailTemplate,
  // The same data you would pass to #inject()
  data: { confirmationURL: '...' }
})
.then(() => {
  console.log('Email sent!');
})
.catch((error) => {
  console.warn('mjmlUtils.sendmail error', error);
});
```

## Versioning

To keep better organization of releases this project follows the [Semantic Versioning 2.0.0](http://semver.org/) guidelines.

## Contributing
Want to contribute? [Follow these recommendations](https://github.com/justinsisley/mjml-utils/blob/master/CONTRIBUTING.md).

## License
[MIT License](https://github.com/justinsisley/mjml-utils/blob/master/LICENSE.md) © [Justin Sisley](http://justinsisley.com/)
