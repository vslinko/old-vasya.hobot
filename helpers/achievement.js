/**
 * Вяся Хобот
 */


var request = require('request');


var locationRegexp = /^\.\/result\.php\?id=(\d+)$/;
var maxIcon = 583;


module.exports = function(robot) {
    robot.helpers.achievement = function(title, message, icon, callback) {
        if (!icon) {
            icon = Math.floor(Math.random() * maxIcon) + 1;
        }

        if (icon > maxIcon) {
            return callback(new Error('Invalid achievement icon'));
        }

        request.post('http://worldcraft.com.ua/minecraft/generator.php', {
            form: {
                icon: icon,
                name: title,
                name1: message
            }
        }, function(err, res, body) {
            var url, matches;

            if (err) {
                return callback(err);
            }

            if (!res.headers.location) {
                return callback(new Error('No location header in response'));
            }

            matches = locationRegexp.exec(res.headers.location);

            if (!matches) {
                return callback(new Error('Invalid location header in response'));
            }

            url = 'http://worldcraft.com.ua/minecraft/out/' + matches[1] + '.png';

            robot.helpers.fileCache.http('achievements', url, callback);
        });
    };
};
