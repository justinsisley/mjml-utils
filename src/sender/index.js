const inquirer = require('inquirer');
const questions = require('./questions');
const handleAnswers = require('./answers');

module.exports = (templateDir) => {
  inquirer.prompt(questions(templateDir))
  .then(answers => handleAnswers(answers, templateDir));
};
