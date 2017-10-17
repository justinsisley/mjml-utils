const path = require('path');
const chokidar = require('chokidar');
const build = require('../builder').build;

module.exports = (inputDir, outputDir, extension) => {
  if (!inputDir) {
    console.error('Error: Missing -i argument (input directory)\n');
    return;
  }

  if (!outputDir) {
    console.error('Error: Missing -o argument (output directory)\n');
    return;
  }

  const sourceDir = path.join(process.cwd(), inputDir);
  const watcher = chokidar.watch(sourceDir);

  watcher.on('ready', () => {
    console.log('\nTemplate watcher started\n');
  });

  watcher.on('error', (error) => {
    console.log(`Watcher error: ${error}`);
  });

  watcher.on('change', (filePath) => {
    const isMjml = /\.mjml$/.test(filePath);

    if (isMjml) {
      build(filePath.replace(/\\/g, '/'), outputDir, extension);
    }
  });
};
