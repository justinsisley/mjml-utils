'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mjml = require('mjml');

var _mjml2 = _interopRequireDefault(_mjml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTemplateFilename(filePath) {
  var split = filePath.split('/');
  return split[split.length - 1];
}

function mkdir(directory) {
  try {
    _fs2.default.readdirSync(directory);
  } catch (err) {
    _fs2.default.mkdirSync(directory);
  }
}

var build = exports.build = function build(filePath, outputDir) {
  var outputPath = _path2.default.join(process.cwd(), outputDir);
  mkdir(outputPath);

  var startTime = Date.now();
  var data = _fs2.default.readFileSync('' + filePath, 'utf8');
  var rendered = _mjml2.default.mjml2html(data);
  var filename = getTemplateFilename(filePath).replace('.mjml', '.html');

  _fs2.default.writeFileSync(outputPath + '/' + filename, rendered);

  var endTime = Date.now();
  var totalTime = endTime - startTime;
  console.log('Rendered ' + filename + ' in ' + totalTime + 'ms'); // eslint-disable-line
};

exports.default = function (inputDir, outputDir) {
  var sourcePath = _path2.default.join(process.cwd(), inputDir);
  var templates = _fs2.default.readdirSync(sourcePath);
  if (!templates.length) {
    throw new Error('No templates to build');
  }

  var outputPath = _path2.default.join(process.cwd(), outputDir);
  mkdir(outputPath);

  templates.forEach(function (template) {
    build(sourcePath + '/' + template, outputDir);
  });
};