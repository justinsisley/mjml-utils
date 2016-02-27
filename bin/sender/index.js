'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

var _answers = require('./answers');

var _answers2 = _interopRequireDefault(_answers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (templateDir) {
  _inquirer2.default.prompt((0, _questions2.default)(templateDir), function (answers) {
    (0, _answers2.default)(answers, templateDir);
  });
};