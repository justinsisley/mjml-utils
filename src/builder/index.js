import fs from 'fs';
import path from 'path';
import {mjml2html} from 'mjml';

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

export const build = (filePath, outputDir) => {
  const outputPath = path.join(process.cwd(), outputDir);
  mkdir(outputPath);

  const startTime = Date.now();
  const data = fs.readFileSync(`${filePath}`, 'utf8');
  const rendered = mjml2html(data);
  const filename = getTemplateFilename(filePath).replace('.mjml', '.html');

  fs.writeFileSync(`${outputPath}/${filename}`, rendered);

  const endTime = Date.now();
  const totalTime = endTime - startTime;
  console.log(`Rendered ${filename} in ${totalTime}ms`); // eslint-disable-line
};

export default (inputDir, outputDir) => {
  const sourcePath = path.join(process.cwd(), inputDir);
  const templates = fs.readdirSync(sourcePath);
  if (!templates.length) {throw new Error('No templates to build');}

  const outputPath = path.join(process.cwd(), outputDir);
  mkdir(outputPath);

  templates.forEach(template => {
    build(`${sourcePath}/${template}`, outputDir);
  });
};
