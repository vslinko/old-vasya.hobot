/**
 * Вяся Хобот
 */


var nconf = require('nconf');


nconf.file({file: 'vasya.json'});

nconf.defaults({
    server: {
        hostname: 'localhost',
        directory: 'public',
        port: 3001
    },
    fail: {
        showErrorMessage: true
    },
    fileCache: {
        http: {
            enable: true   
        }
    }
});


module.exports = nconf;
