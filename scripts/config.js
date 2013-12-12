// Commands:
//   hubot покажи конфиг
//   hubot установи <настройку> в <значение>


module.exports = function(robot) {
    robot.respond(/покажи конфиг/i, function (msg) {
        msg.send(robot.helpers.getAllConfigKeys().map(function(key) {
            return key + ' ' + JSON.stringify(robot.config.get(key));
        }).join('\n'));
    });

    robot.respond(/установи (.+) в (.+)/i, function(msg) {
        var value;

        try {
            value = JSON.parse(msg.match[2]);
        } catch (err) {
            return robot.helpers.fail(msg, err);
        }

        robot.config.set(msg.match[1], value);
        robot.config.save(robot.helpers.fail.callback(msg, 'сохранил'));
    });
};
