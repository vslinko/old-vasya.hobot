// Commands:
//   hubot ачивка <номер> <заголовок>: <текст>
//   hubot ачивка <номер> <заголовок> <текст>
//   hubot ачивка <заголовок>: <текст>
//   hubot ачивка <заголовок> <текст>


module.exports = function(robot) {
    robot.respond(/(?:ачивка|вручи ачивку|выдай ачивку) (?:(\d+) )?(.+)/i, function(msg) {
        var sep, title, message, icon;

        if (msg.match[2].indexOf(':') >= 0) {
            sep = ':';
        } else if (msg.match[2].indexOf(' ') >= 0) {
            sep = ' ';
        }

        if (sep) {
            message = msg.match[2].split(sep);
            title = message.shift().trim();
            message = message.join(sep).trim();
        } else {
            title = message = msg.match[2].trim();
        }

        icon = msg.match[1];

        robot.helpers.achievement(title, message, icon, robot.helpers.fail.callback(msg));
    });
};
