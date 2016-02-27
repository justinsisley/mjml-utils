import inquirer from 'inquirer';
import questions from './questions';
import handleAnswers from './answers';

inquirer.prompt(questions, handleAnswers);
