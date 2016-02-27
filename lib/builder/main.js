import fs from 'fs';
import path from 'path';
import mjml from 'mjml';

const dirs = {
  src: path.join(__dirname, '../../src'),
  build: path.join(__dirname, '../../build'),
};

const templates = fs.readdirSync(dirs.src);
if (!templates.length) {throw new Error('No templates to build');}

try {
  fs.readdirSync(dirs.build);
} catch (err) {
  fs.mkdirSync(dirs.build);
}

export const build = (template) => {
  const startTime = Date.now();
  const data = fs.readFileSync(`${dirs.src}/${template}`, 'utf8');
  const rendered = mjml.mjml2html(data);
  const filename = template.replace('mjml', 'html');

  fs.writeFileSync(`${dirs.build}/${filename}`, rendered);

  const endTime = Date.now();
  const totalTime = endTime - startTime;
  console.log(`Rendered ${template} in ${totalTime}ms`); // eslint-disable-line
};

templates.forEach(build);
