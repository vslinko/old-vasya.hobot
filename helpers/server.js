/**
 * Вяся Хобот
 */


var express = require('express');
var fs = require('fs-extra');


module.exports = function(robot) {
    var directory = robot.config.get('server:directory');

    if (!fs.existsSync(directory)) {
        fs.mkdirpSync(directory);
    }

    var app = express();
    app.use(express.static(directory));
    app.listen(robot.config.get('server:port'));
};
