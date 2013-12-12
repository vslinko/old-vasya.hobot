/**
 * Вяся Хобот
 */


var nconf = require('nconf');


nconf.file({file: 'vasya.json'});

nconf.defaults({
    admin: {
        users: []
    },
    brain: {
        file: 'brain.json'
    },
    deploy: {
        timeout: 1000 * 60 * 10,
        dataEmitInterval: 2000,
        projects: {}
    },
    fail: {
        showErrorMessage: true
    },
    fileCache: {
        http: {
            enable: true   
        }
    },
    server: {
        hostname: 'localhost',
        directory: 'public',
        port: 3001
    }
});


module.exports = nconf;
