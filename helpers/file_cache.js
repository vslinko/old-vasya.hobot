/**
 * Вяся Хобот
 */


var request = require('request');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs-extra');


module.exports = function(robot) {
    robot.helpers.fileCache = {};

    robot.helpers.fileCache.http = function(prefix, url, callback) {
        if (!robot.config.get('fileCache:http:enable')) {
            return callback(null, url);
        }

        var directory = path.join(robot.config.get('server:directory'), prefix);

        fs.mkdirp(directory, function(err) {
            if (err) {
                return callback(err);
            }

            var hash = crypto.createHash('sha1').update(url).digest('hex');
            var fileName = hash + path.extname(url);
            var file = path.join(directory, fileName);

            var rs = request(url);
            var ws = fs.createWriteStream(file);

            rs.on('error', callback);

            rs.on('end', function() {
                var url = 'http://'
                        + robot.config.get('server:hostname')
                        + path.join('/', prefix, fileName);

                callback(null, url);
            });

            rs.pipe(ws);
        });
    };
};
