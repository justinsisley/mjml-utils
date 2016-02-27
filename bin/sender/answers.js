'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _promptToSend = require('./promptToSend');

var _promptToSend2 = _interopRequireDefault(_promptToSend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (answers, templateDir) {
  var from = answers.from;
  var password = answers.password;
  var to = answers.to;
  var template = answers.template;


  var transporter = _nodemailer2.default.createTransport({
    service: 'gmail',
    auth: { user: from, pass: password }
  });

  (0, _promptToSend2.default)(transporter, from, to, _path2.default.join(templateDir, template));
};