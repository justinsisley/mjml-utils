import fs from 'fs';
import path from 'path';

export default (template, from, to, transporter, callback) => {
  const subject = new Date();
  const templatePath = path.join(process.cwd(), `${template}.html`);
  const html = fs.readFileSync(templatePath, 'utf-8');
  const mailConfig = { from, to, subject, html };

  transporter.sendMail(mailConfig, (error, info) => {
    if (error) {console.log(error);} // eslint-disable-line
    console.log(`Message sent: ${info.response}`); // eslint-disable-line

    callback();
  });
};
