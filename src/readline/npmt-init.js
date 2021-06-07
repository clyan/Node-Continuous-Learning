const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'OHAI> '
});
const preHint = `
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`npm help json\` for definitive documentation on these fields
and exactly what they do.

Use \`npm install <pkg> --save\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
`;

console.log(preHint);

const questions = ['name', 'version', 'email','author'];
const defaultAnswers  = ['name', '0.1', '', 'none'];

let  answers = [];
let index = 0;
function createPackageJson () {
  const map = {};
  questions.forEach(function(question, index){
    map[question] = answers[index];
  });
  fs.writeFileSync('./init/package.json',JSON.stringify(map, null, 4))
}
function runQuestionLoop () {
  if (index === questions.length) {
    createPackageJson();
    rl.close();
    process.exit(0);
    return;
  }
  let defaultAnswer = defaultAnswers[index];
  let question = questions[index]+ `:(${defaultAnswer})`;
  rl.question(question, function (answer) {
    answers.push( answer || defaultAnswer);
    index ++;
    runQuestionLoop();
  })
}
runQuestionLoop();

