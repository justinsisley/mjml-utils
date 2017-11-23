const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml').mjml2html;

const builder = {};

function getTemplateFilename(filePath) {
  const split = filePath.split('/');

  return split[split.length - 1];
}

function mkdir(directory) {
  try {
    fs.readdirSync(directory);
  } catch (err) {
    fs.mkdirSync(directory);
  }
}

builder.build = (filePath, outputDir, extension) => {
  // No-op if filePath is not a file
  if (!fs.statSync(filePath).isFile()) {
    return;
  }

  const filename = getTemplateFilename(filePath).replace('.mjml', extension);

  try {
    const outputPath = path.join(process.cwd(), outputDir);
    mkdir(outputPath);

    const startTime = Date.now();
    const data = fs.readFileSync(`${filePath}`, 'utf8');
    const rendered = mjml2html(data);

    fs.writeFileSync(`${outputPath}/${filename}`, rendered.html);

    const endTime = Date.now();
    const totalTime = endTime - startTime;
    console.log(`Rendered ${filename} in ${totalTime}ms`); // eslint-disable-line
  } catch (error) {
    console.error(`Unable to render ${filename}`);
    console.error(error.message);
  }
};

builder.buildAll = (inputDir, outputDir, extension) => {
  const sourcePath = path.join(process.cwd(), inputDir);
  const templates = fs.readdirSync(sourcePath);

  if (!templates.length) {
    throw new Error('No templates to build');
  }

  const outputPath = path.join(process.cwd(), outputDir);
  mkdir(outputPath);

  templates.forEach((template) => {
    builder.build(`${sourcePath}/${template}`, outputDir, extension);
  });
};

module.exports = builder;
