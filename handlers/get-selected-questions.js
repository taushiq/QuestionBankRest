const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = (req, resp) => {
    const names = req.params.names.split(",");
    const authors = req.params.authors.split(",");

    var sql = `select '${authors[0]}' as author, question,answer_one,answer_two,answer_three,answer_four,correct_answer from ${names[0]}_${authors[0]}`;
    for(var i=1; i<names.length;i++){
        sql = sql + ` UNION select '${authors[i]}' as author,question,answer_one,answer_two,answer_three,answer_four,correct_answer from ${names[i]}_${authors[i]}`
    }

    const conn = mysql.createConnection(mysqlCfg);

    conn.query(sql,
        (err, rows) => {
            if (err) throw err;
            resp.send(rows);

            conn.end();

        });


};