import nodemailer from 'nodemailer';
import promptToSend from './promptToSend';

export default (answers) => {
  const { from, password, to, template } = answers;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: from, pass: password },
  });

  promptToSend(transporter, from, to, template);
};
