'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (templateDir) {
  var templates = _fs2.default.readdirSync(_path2.default.join(process.cwd(), templateDir));
  if (!templates.length) {
    throw new Error('No templates to test');
  }
  var filtered = templates.filter(function (template) {
    return (/\.html$/.test(template)
    );
  });
  var templateNames = filtered.map(function (template) {
    return template.replace('.html', '');
  });

  return [{
    type: 'input',
    name: 'from',
    message: 'Enter your Gmail account username'
  }, {
    type: 'password',
    name: 'password',
    message: 'Enter your Gmail account password'
  }, {
    type: 'input',
    name: 'to',
    message: 'Enter the recipient email address'
  }, {
    type: 'list',
    name: 'template',
    message: 'Which template do you want to test?',
    choices: templateNames,
    default: 0
  }];
};