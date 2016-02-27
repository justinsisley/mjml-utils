import inquirer from 'inquirer';
import questions from './questions';
import handleAnswers from './answers';

export default (templateDir) => {
  inquirer.prompt(questions(templateDir), handleAnswers);
};
