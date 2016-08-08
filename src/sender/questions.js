const fs = require('fs');
const path = require('path');

module.exports = (templateDir) => {
  const templates = fs.readdirSync(path.join(process.cwd(), templateDir));

  if (!templates.length) {
    throw new Error('No templates to test');
  }

  const filtered = templates.filter(template => /\.html$/.test(template));
  const templateNames = filtered.map(template => template.replace('.html', ''));

  return [
    {
      type: 'input',
      name: 'from',
      message: 'Enter your Gmail account username (not saved)',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your Gmail account password (not saved)',
    },
    {
      type: 'input',
      name: 'to',
      message: 'Enter the recipient email address (not saved)',
    },
    {
      type: 'list',
      name: 'template',
      message: 'Which template do you want to test?',
      choices: templateNames,
      default: 0,
    },
  ];
};
