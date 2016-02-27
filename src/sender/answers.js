import path from 'path';
import nodemailer from 'nodemailer';
import promptToSend from './promptToSend';

export default (answers, templateDir) => {
  const { from, password, to, template } = answers;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: from, pass: password },
  });

  promptToSend(transporter, from, to, path.join(templateDir, template));
};
