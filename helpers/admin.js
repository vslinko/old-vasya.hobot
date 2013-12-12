/**
 * Вяся Хобот
 */


module.exports = function(robot) {
    robot.helpers.isAdmin = function(user) {
        return robot.config.get('admin:users').indexOf(user.name) >= 0;
    };

    robot.helpers.checkAdmin = function(msg) {
        if (!robot.helpers.isAdmin(msg.message.user)) {
            robot.helpers.fail(msg, 'запрещено');
            return false;
        }

        return true;
    };
};
