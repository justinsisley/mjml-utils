import inquirer from 'inquirer';
import send from './send';

const promptToSend = (transporter, from, to, template) => {
  inquirer.prompt([{
    type: 'confirm',
    name: 'send',
    default: true,
    message: 'Send test email',
  }], sendResponse => {
    if (sendResponse.send) {
      send(template, from, to, transporter, () => {
        promptToSend(transporter, from, to, template);
      });
    }
  });
};

export default promptToSend;
