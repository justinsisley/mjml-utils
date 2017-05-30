const path = require('path');
const chokidar = require('chokidar');
const build = require('../builder').build;

module.exports = (inputDir, outputDir, extension) => {
  const sourceDir = path.join(process.cwd(), inputDir);
  const watcher = chokidar.watch(sourceDir);

  watcher.on('ready', () => {
    console.log('\nTemplate watcher started\n');
  });

  watcher.on('error', (error) => {
    console.log(`Watcher error: ${error}`);
  });

  watcher.on('change', (filePath) => {
    build(filePath.replace(/\\/g, '/'), outputDir, extension);
  });
};
