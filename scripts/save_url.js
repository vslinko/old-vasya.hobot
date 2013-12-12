// Commands:
//   hubot сохрани <описание> <ссылка>
//   hubot сохрани <ссылка>
//   hubot что ты сохранил?


var brainKey = 'save_url:saved';


module.exports = function(robot) {
    robot.respond(/(?:сохрани|схорони) (.+ )?(https?:\/\/[^\s]+)/i, function(msg) {
        var description = msg.match[1] || '';
        var url = msg.match[2];

        robot.helpers.fileCache.http('saved', url, function(err, url) {
            if (err) {
                return robot.helpers.fail(msg, err);
            }

            var saved = robot.brain.get(brainKey) || [];

            saved.push({
                description: description.trim(),
                url: url
            });

            robot.brain.set(brainKey, saved);

            msg.send('Сохранил ' + url);
        });
    });

    robot.respond(/(?:закрома|что ты (?:сохранил|схоронил)\??)/i, function(msg) {
        var saved = robot.brain.get(brainKey) || [];

        if (saved.length === 0) {
            msg.send('Пусто в закромах');
        } else {
            msg.send(saved.map(function(save) {
                return save.description.length > 0
                     ? save.description + ': ' + save.url
                     : save.url;
            }).join('\n'));
        }
    });
};
