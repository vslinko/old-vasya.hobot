/**
 * Вяся Хобот
 */


require('coffee-script');

var config = require('./config');
var hubot = require('hubot');
var path = require('path');
var fs = require('fs');


var env = process.env.NODE_ENV || 'development';
var production = env === 'production';

var adaptersPath = path.join(__dirname, 'node_modules', 'hubot', 'src', 'adapters');
var helpersPath = path.join(__dirname, 'helpers');

var enableHttpd = false;
var adapter = production ? 'skype' : 'shell';
var alias = 'Вась';
var name = 'Вася';

var robot = hubot.loadBot(adaptersPath, adapter, enableHttpd, name);

robot.env = env;
robot.production = production;
robot.config = config;
robot.alias = alias;
robot.helpers = {};

fs.readdirSync(helpersPath).forEach(function(file) {
    if (/\.(js|coffee)$/.test(file)) {
        require(path.join(helpersPath, file))(robot);
    }
});

robot.adapter.on('connected', function() {
    robot.load(path.join(__dirname, 'scripts'));
});

robot.run();
