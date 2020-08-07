const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {
    // req.params --> URI segments, req.query --> query parameters
    // resp.send(req.query); 

    const conn = mysql.createConnection(mysqlCfg);
    conn.query('select * from question_banks',
        (err, rows) => {
            if (err) throw err;

            resp.send(rows);   

            conn.end();

        });
    
};