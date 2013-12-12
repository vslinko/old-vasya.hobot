// Commands:
//   hubot кто я?


module.exports = function(robot) {
    robot.respond(/кто я\??/i, function(msg) {
        var user = robot.brain.userForId(msg.message.user.id);

        var message = user.name;

        if (robot.helpers.isAdmin(user)) {
            message += ' (админ)';
        }

        msg.send(message);
    });
};
