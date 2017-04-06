#!/usr/bin/env node

const argv = require('yargs').argv;
const buildAll = require('./builder').buildAll;
const watcher = require('./watcher');
const sender = require('./sender');
const inject = require('./inject');
const sendmail = require('./sendmail');

const extension = argv.e || '.html';

if (argv.build) {
  buildAll(argv.i, argv.o, extension);
}

if (argv.watch) {
  watcher(argv.i, argv.o, extension);
}

if (argv.send) {
  sender(argv.o);
}

// Non-cli utils
module.exports = {
  inject,
  sendmail,
};
