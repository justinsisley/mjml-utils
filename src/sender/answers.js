const path = require('path');
const nodemailer = require('nodemailer');
const promptToSend = require('./promptToSend');

module.exports = (answers, templateDir) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: answers.from, pass: answers.password },
  });

  const template = path.join(templateDir, answers.template);

  promptToSend(transporter, answers.from, answers.to, template);
};
