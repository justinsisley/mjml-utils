import path from 'path';
import watchr from 'watchr';
import { build } from '../builder';

const startedMessage = '\nTemplate watcher started\n';
const errorMessage = 'Something went wrong';

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
  build(filePath, outputDir);
}

export default (inputDir, outputDir) => {
  const sourceDir = path.join(process.cwd(), inputDir);

  watchr.watch({
    paths: [sourceDir],
    listeners: {
      error: onError,
      watching: onWatching,
      change(type, filePath) {
        onChange(filePath, outputDir);
      },
    },
  });
};
