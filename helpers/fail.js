/**
 * Вяся Хобот
 */


module.exports = function(robot) {
    robot.helpers.fail = function(msg, err) {
        var message, errorMessage;

        message = 'Не удалось выполнить "' + msg.message.text + '"';

        if (robot.config.get('fail:showErrorMessage')) {
            if (typeof err === 'string') {
                errorMessage = err;
            } else if (err instanceof Error && err.message) {
                errorMessage = err.message;
            }

            if (errorMessage) {
                message += ': ' + errorMessage;
            }
        }

        msg.send(message);
    };

    robot.helpers.fail.callback = function(msg, format) {
        return function() {
            var message,
                args = Array.prototype.slice.call(arguments),
                err = args.shift();

            if (err) {
                fail(msg, err);
            }

            if (typeof format === 'function') {
                message = format.apply(null, args);
            } else if (typeof format === 'string') {
                message = format;
            } else {
                message = args.shift();
            }

            msg.send(message);
        };
    };
};
