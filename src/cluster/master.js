const fork = require('child_process').fork;
const cpus = require('os').cpus();

const server = require('net').createServer();
server.listen(1338);

let workers = {};
const createWorker = function () {
  let worker = fork(__dirname + '/worker.js');
  worker.on('exit', function () {
    console.log('Worker ' + worker.pid + ' exited');
    delete workers[worker.pid];
    createWorker();
  });
  worker.send('server', server);
  workers[worker.pid] = worker;
  console.log('Create worker. pid: ' + worker.pid)
}
for(let i = 0; i < cpus.length; i++) {
  createWorker();
}
process.on('exit', function () {
  for (let pid in workers) {
    workers[pid].kill();
  }
})
