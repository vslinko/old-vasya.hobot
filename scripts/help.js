// Commands:
//   hubot что умеешь?


module.exports = function(robot) {
    robot.respond(/что умеешь\??/i, function(msg) {
        msg.send(robot.helpCommands().map(function(command) {
            return command.replace(/hubot/g, robot.name);
        }).join('\n'));
    });
};
