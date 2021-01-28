const Connect = require('tedious').Connection;

const config = {
    server: '192.168.219.106',
    database: 'whats_db',
    encrypt: false,
    userName: 'whats_user',
    password: 'Qwer1234!@#$'
}

const connection = new Connect(config);
connection.on('connect', err => {

    if(err) new Error('Connected Error', err);

    console.log('Connected whats_db');
});

module.exports = connection;