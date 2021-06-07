const readlineProcess = require('src/readline/readlineProcess');


const rl = readlineProcess.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('please input a word:', function (answer) {
  console.log("answer", answer.toUpperCase());
  rl.close();
} )
