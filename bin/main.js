#!/usr/bin/env node
'use strict';

var _yargs = require('yargs');

var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

var _watcher = require('./watcher');

var _watcher2 = _interopRequireDefault(_watcher);

var _sender = require('./sender');

var _sender2 = _interopRequireDefault(_sender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var build = _yargs.argv.build;
var watch = _yargs.argv.watch;
var send = _yargs.argv.send;
var i = _yargs.argv.i;
var o = _yargs.argv.o;


if (build) {
  (0, _builder2.default)(i, o);
}
if (watch) {
  (0, _watcher2.default)(i, o);
}
if (send) {
  (0, _sender2.default)(o);
}