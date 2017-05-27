const fs = require('fs');
const mjml2html = require('mjml').mjml2html;

const templateCache = {};

function sendmail({ to, subject, text, template, data, onError = () => {} }) {
  if (!sendmail.config.fromAddress) {
    throw new Error('mjml-utils sendmail missing fromAddress configuration');
  }

  if (!sendmail.config.transport) {
    throw new Error('mjml-utils sendmail missing transport configuration (prior to v2.0.0, this was "transporter")');
  }

  return new Promise((resolve, reject) => {
    function resolver(rawTemplate) {
      let { html } = mjml2html(rawTemplate, { filePath: template });

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
          reject(error);
        }
      });

      resolve();
    }

    // Prefer cached template
    if (templateCache[template]) {
      resolver(templateCache[template]);
      return;
    }

    // No cached template, read from disk
    fs.readFile(template, 'utf8', (readFileError, rawTemplate) => {
      if (readFileError) {
        onError(readFileError);
        reject(readFileError);
        return;
      }

      templateCache[template] = rawTemplate;

      resolver(rawTemplate);
    });
  });
}

sendmail.config = function config({ fromAddress, transport }) {
  sendmail.config.fromAddress = fromAddress;
  sendmail.config.transport = transport;
};

module.exports = sendmail;
