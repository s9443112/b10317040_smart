var mysql = require('mysql');
var database = require('../config/auth.js');


var connection = mysql.createConnection({
    host: database.MySQL.host,
    user: database.MySQL.user,
    password: database.MySQL.password,
    database: database.MySQL.database,
    dateStrings: true
});


exports.get_user_information = function get_user_information(msg, callback) {

    var sql = "SELECT * FROM mem_data where mem_id=" + msg;
    connection.query(sql, function (error, result) {
       
        console.log(result);
       
        callback(result);
    });
}

