#!/usr/bin/env node

import { argv } from 'yargs';
import builder from './builder';
import watcher from './watcher';
import sender from './sender';

const { build, watch, send, i, o } = argv;

if (build) {builder(i, o);}
if (watch) {watcher(i, o);}
if (send) {sender(o);}
