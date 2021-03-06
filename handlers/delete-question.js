const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = (req, resp) => {
    const bname = req.params.bname;
    const author = req.params.author;
    const question = req.params.question;
    //console.log('bname', bname);

    // cause of an SQL injection:
    // const sql = `select * from customers where customer_id = '${id}'`;

    const sql = `delete from ${bname}_${author} where question in ('${question}','${question}?' ) `;
    //console.log('sql', sql);
    const conn = mysql.createConnection(mysqlCfg);
    conn.query(sql, (err, result) => {
        if(err) throw err;
        //resp.send(result);
        conn.query(
            //'insert into question_banks(bname,no_of_questions,author) values [?]',
            `UPDATE question_banks set no_of_questions = (no_of_questions - 1) where bname = '${bname}' and author='${author}';`,
            (err) => {
                if (err) throw err; // results in HTTP response code 500
                resp.end(); // ends the response, and sends HTTP response code 200 with out any content
            });
        
    conn.end();


});

}