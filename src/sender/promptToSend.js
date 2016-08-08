const inquirer = require('inquirer');
const send = require('./send');

const promptToSend = (transporter, from, to, template) => {
  inquirer.prompt([{
    type: 'confirm',
    name: 'send',
    default: true,
    message: 'Send test email',
  }])
  .then(sendResponse => {
    if (sendResponse.send) {
      send(template, from, to, transporter, () => {
        promptToSend(transporter, from, to, template);
      });
    }
  });
};

module.exports = promptToSend;
