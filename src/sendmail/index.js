const inject = require('../inject');

function sendmail({ to, subject, text, template, data }) {
  if (!sendmail.config.fromAddress) {
    throw new Error('mjml-utils sendmail missing fromAddress configuration');
  }

  if (!sendmail.config.transporter) {
    throw new Error('mjml-utils sendmail missing transporter configuration');
  }

  return new Promise((resolve, reject) => {
    inject(template, data)
    .then((emailTemplate) => {
      const mailOptions = {
        from: sendmail.config.fromAddress,
        html: emailTemplate,
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
    })
    .catch(reject);
  });
}

sendmail.config = function config({ fromAddress, transporter }) {
  sendmail.config.fromAddress = fromAddress;
  sendmail.config.transporter = transporter;
};

module.exports = sendmail;
