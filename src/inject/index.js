const fs = require('fs');

// Take a compiled template and inject replacement values
module.exports = (template, vars = {}) =>
  new Promise((resolve, reject) => {
    fs.readFile(
      template,
      { encoding: 'utf8' },
      (err, data) => {
        if (err) {
          return reject(err);
        }

        let finalTemplate = data;

        Object.keys(vars).forEach((key) => {
          const regex = new RegExp(`{${key}}`, 'g');
          finalTemplate = finalTemplate.replace(regex, vars[key]);
        });

        return resolve(finalTemplate);
      }
    );
  });
