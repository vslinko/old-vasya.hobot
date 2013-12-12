/**
 * Вяся Хобот
 */


var childProcess = require('child_process');
var events = require('events');
var util = require('util');


var deployProcess = null;
var interval = null;
var timeout = null;


module.exports = function(robot) {
    robot.helpers.deploy = function(projectName) {
        var emitter = new events.EventEmitter();

        setTimeout(function() {
            var projects = robot.config.get('deploy:projects'),
                project,
                data = '';

            if (!projects || !projects[projectName]) {
                return emitter.emit('error', new Error('ProjectNotFound'));
            }

            if (deployProcess !== null) {
                return emitter.emit('error', new Error('DeployLimit'));
            }

            project = projects[projectName];

            deployProcess = childProcess.exec(project.command, project.options, function(err, stdout, stderr) {
                if (deployProcess === null) {
                    return;
                }

                if (data.length > 0) {
                    emitter.emit('data', data);
                }

                if (err) {
                    emitter.emit('data', stderr.split('\n').slice(-25).join('\n'));
                    emitter.emit('error', new Error('ProcessError'));
                } else {
                    emitter.emit('end');
                }

                clearInterval(interval);
                clearTimeout(timeout);

                deployProcess = null;
                interval = null;
                timeout = null;
            });

            timeout = setTimeout(function() {
                if (data.length > 0) {
                    emitter.emit('data', data);
                }

                emitter.emit('error', new Error('ProcessTimeout'));

                deployProcess.kill('SIGKILL');
                clearInterval(interval);

                deployProcess = null;
                interval = null;
                timeout = null;
            }, robot.config.get('deploy:timeout'));

            interval = setInterval(function() {
                if (data.length > 0) {
                    var message = data.split('\n');

                    if (message.length > 1) {
                        data = message.pop();
                        emitter.emit('data', message.join('\n'));
                    }
                }
            }, robot.config.get('deploy:dataEmitInterval'));

            deployProcess.stdout.on('data', function(buffer) {
                data += buffer.toString();
            });
        }, 0);

        return emitter;
    };
};
