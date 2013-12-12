/**
 * Вяся Хобот
 */


var fs = require('fs-extra');


module.exports = function(robot) {
    var previousData;
    var brainFile = robot.config.get('brain:file');

    if (fs.existsSync(brainFile)) {
        previousData = fs.readFileSync(brainFile).toString();
        robot.brain.mergeData(JSON.parse(previousData));
    }

    robot.brain.on('save', function(data) {
        data = JSON.stringify(data, null, 2);

        if (data !== previousData) {
            previousData = data;

            fs.outputFile(brainFile, data, function(err) {
                if (err) {
                    robot.logger.error(err);
                }
            });
        }
    });
};
