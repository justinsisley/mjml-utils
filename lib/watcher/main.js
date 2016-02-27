import path from 'path';
import watchr from 'watchr';
import { build } from '../builder/main';

const dirs = {
  src: path.join(__dirname, '../../src'),
  build: path.join(__dirname, '../../build'),
};

function getTemplateFilename(filePath) {
  const split = filePath.split('/');
  return split[split.length - 1];
}

const startedMessage = '\nTemplate watcher started\n';
const errorMessage = 'Something went wrong';

watchr.watch({
  paths: [dirs.src],
  listeners: {
    error(err) {
      console.log(errorMessage, err); // eslint-disable-line
    },
    watching(err) {
      if (err) {
        console.log(errorMessage, err); // eslint-disable-line
      } else {
        console.log(startedMessage); // eslint-disable-line
      }
    },
    change(changeType, filePath) {
      const filename = getTemplateFilename(filePath);
      build(filename);
    },
  },
});
