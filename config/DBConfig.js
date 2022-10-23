const mysql = require('mysql');
//특정데이터베이스지정 // sql아이디비번
let conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'cshuser',
    password: 'cshpass',
    port: '3306',
    database: 'nodejs_db'
})
module.exports=conn