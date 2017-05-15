const path = require('path');
const nodemailer = require('nodemailer');
const promptToSend = require('./promptToSend');

module.exports = (answers, templateDir) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: answers.from, pass: answers.password },
  });

  const template = path.join(templateDir, answers.template);

  promptToSend(transport, answers.from, answers.to, template);
};
