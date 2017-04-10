const fs = require('fs');
const mjml2html = require('mjml').mjml2html;

function sendmail({ to, subject, text, template, data, onError = () => {} }) {
  if (!sendmail.config.fromAddress) {
    throw new Error('mjml-utils sendmail missing fromAddress configuration');
  }

  if (!sendmail.config.transport) {
    throw new Error('mjml-utils sendmail missing transport configuration');
  }

  return new Promise((resolve, reject) => {
    fs.readFile(template, 'utf8', (readFileError, rawTemplate) => {
      if (readFileError) {
        reject(readFileError);
        return;
      }

      let { html } = mjml2html(rawTemplate);

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

      sendmail.config.transport.sendMail(mailOptions, (error) => {
        if (error) {
          onError(error);
        }
      });

      resolve();
    });
  });
}

sendmail.config = function config({ fromAddress, transport }) {
  sendmail.config.fromAddress = fromAddress;
  sendmail.config.transport = transport;
};

module.exports = sendmail;
