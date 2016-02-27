'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (template, from, to, transporter, callback) {
  var subject = new Date();
  var templatePath = _path2.default.join(process.cwd(), template + '.html');
  var html = _fs2.default.readFileSync(templatePath, 'utf-8');
  var mailConfig = { from: from, to: to, subject: subject, html: html };

  transporter.sendMail(mailConfig, function (error, info) {
    if (error) {
      console.log(error);
    } // eslint-disable-line
    console.log('Message sent: ' + info.response); // eslint-disable-line

    callback();
  });
};