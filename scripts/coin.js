// Commands:
//   hubot кинь монетку


module.exports = function(robot) {
    robot.respond(/кинь монетку/i, function(msg) {
        msg.reply(msg.random(['орел', 'решка']));
    });
};
