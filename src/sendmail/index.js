const fs = require('fs');
const mjml2html = require('mjml').mjml2html;

function sendmail({ to, subject, text, template, data }) {
  if (!sendmail.config.fromAddress) {
    throw new Error('mjml-utils sendmail missing fromAddress configuration');
  }

  if (!sendmail.config.transporter) {
    throw new Error('mjml-utils sendmail missing transporter configuration');
  }

  return new Promise((resolve, reject) => {
    fs.readFile(template, 'utf8', (readFileError, rawTemplate) => {
      if (readFileError) {
        reject(readFileError);
        return;
      }

      let html = mjml2html(rawTemplate);

      Object.keys(data).forEach((key) => {
        const regex = new RegExp(`{${key}}`, 'g');
        html = html.replace(regex, data[key]);
      });

      const mailOptions = {
        from: sendmail.config.fromAddress,
        html,
        subject,
        text,
        to,
      };

      sendmail.config.transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      });
    });
  });
}

sendmail.config = function config({ fromAddress, transporter }) {
  sendmail.config.fromAddress = fromAddress;
  sendmail.config.transporter = transporter;
};

module.exports = sendmail;
