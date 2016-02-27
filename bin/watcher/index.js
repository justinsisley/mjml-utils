'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _watchr = require('watchr');

var _watchr2 = _interopRequireDefault(_watchr);

var _builder = require('../builder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startedMessage = '\nTemplate watcher started\n';
var errorMessage = 'Something went wrong';

function onError(err) {
  console.log(errorMessage, err); // eslint-disable-line
}

function onWatching(err) {
  if (err) {
    console.log(errorMessage, err); // eslint-disable-line
  } else {
      console.log(startedMessage); // eslint-disable-line
    }
}

function onChange(filePath, outputDir) {
  (0, _builder.build)(filePath, outputDir);
}

exports.default = function (inputDir, outputDir) {
  var sourceDir = _path2.default.join(process.cwd(), inputDir);

  _watchr2.default.watch({
    paths: [sourceDir],
    listeners: {
      error: onError,
      watching: onWatching,
      change: function change(type, filePath) {
        onChange(filePath, outputDir);
      }
    }
  });
};