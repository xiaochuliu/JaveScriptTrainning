// script to run tests on windows and kill zombie node processes
const spawn = require('win-spawn');
const kill = require('tree-kill');

const server = spawn('node', ['shortly.js'], { stdio: 'inherit' });

const test = spawn('./node_modules/.bin/mocha', ['--bail', '--reporter', 'nyan', 'test/ServerSpec.js'], { stdio: 'inherit' });

test.on('close', function(code) {
  kill(server.pid);
});
