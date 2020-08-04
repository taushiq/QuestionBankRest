const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = (req, resp) => {
    const conn = mysql.createConnection(mysqlCfg);

    // perform validation before query
    console.log('Console was here');
    req.body.no_of_questions = 0;
    console.log(req.body);
    const requiredFields = ['bname', 'no_of_questions' , 'author'];

    const missingFields = [];

    requiredFields.forEach((field) => {
        if (field in req.body === false) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        resp.status(400);
        resp.json({ missingFields });
        return;
    }

    //console.log('bname is ',req.body.bid);

    conn.query(
        //'insert into question_banks(bname,no_of_questions,author) values [?]',
        'insert into question_banks set ?',
        req.body,
        (err) => {
            if (err) throw err; // results in HTTP response code 500

            
            //resp.end(); // ends the response, and sends HTTP response code 200 with out any content
        });
    conn.query(
        //'insert into question_banks(bname,no_of_questions,author) values [?]',
        `CREATE TABLE IF NOT EXISTS ${req.body.bname}_${req.body.author}(question VARCHAR(255) primary key, answer_one VARCHAR(255), answer_two VARCHAR(255), answer_three VARCHAR(255), answer_four VARCHAR(255), correct_answer int )`,
        (err) => {
            if (err) throw err; // results in HTTP response code 500
            resp.end(); // ends the response, and sends HTTP response code 200 with out any content
        });

    conn.end();
};