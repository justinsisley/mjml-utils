'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _send = require('./send');

var _send2 = _interopRequireDefault(_send);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var promptToSend = function promptToSend(transporter, from, to, template) {
  _inquirer2.default.prompt([{
    type: 'confirm',
    name: 'send',
    default: true,
    message: 'Send test email'
  }], function (sendResponse) {
    if (sendResponse.send) {
      (0, _send2.default)(template, from, to, transporter, function () {
        promptToSend(transporter, from, to, template);
      });
    }
  });
};

exports.default = promptToSend;