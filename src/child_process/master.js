const cpus = require('os').cpus();
const cp = require('child_process')

// cp.spawn('node', ['worker.js'])
cp.exec('node worker.js', function (err, stdout, stdErr) {
    console.log(stdout)
})
