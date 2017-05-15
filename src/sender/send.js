const fs = require('fs');
const path = require('path');

module.exports = (template, from, to, transport, callback) => {
  const subject = new Date();
  const templatePath = path.join(process.cwd(), `${template}.html`);
  const html = fs.readFileSync(templatePath, 'utf-8');
  const mailConfig = { from, to, subject, html };

  transport.sendMail(mailConfig, (error, info) => {
    if (error) {
      throw new Error(error);
    }

    console.log(`Message sent: ${info.response}`); // eslint-disable-line

    callback();
  });
};
