/**
 * Вяся Хобот
 */


module.exports = function(robot) {
    robot.helpers.getAllConfigKeys = function() {
        var keys = [];

        function readStore(store, prefix) {
            if (!prefix) {
                prefix = '';
            }

            Object.keys(store).forEach(function(key) {
                var value = store[key];
                key = prefix + key;

                if (typeof value === 'object') {
                    readStore(value, key + ':');
                } else if (keys.indexOf(key) <= 0) {
                    keys.push(key);
                }
            });
        }

        Object.keys(robot.config.stores).forEach(function(store) {
            readStore(robot.config.stores[store].store);
        });

        return keys;
    };
};
