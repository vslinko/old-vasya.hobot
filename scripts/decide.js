// Commands:
//   hubot выбери между <а>, <б>, <в>


var strings = [
  'однозначно',
  'конечно',
  'абсолютно точно',
  'сто пудов'
];


module.exports = function(robot) {
    robot.respond(/выбери между (.+,.+)/i, function (msg) {
        var options = msg.match[1].split(',');

        msg.reply(msg.random(strings) + ' ' + msg.random(options).trim())
    });
};
