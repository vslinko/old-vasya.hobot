// Commands:
//   hubot деплой <проект>


module.exports = function(robot) {
    robot.respond(/(?:деплой|задеплой) (.+)/i, function(msg) {
        var deploy = robot.helpers.deploy(msg.match[1]);

        deploy.on('data', function(data) {
            msg.send(data);
        });

        deploy.on('error', function(err) {
            robot.helpers.fail(msg, err);
        });

        deploy.on('end', function() {
            msg.send('деплой прошел ок');
        });
    });
};
