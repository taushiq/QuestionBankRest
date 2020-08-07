const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = (req, resp) => {
    const conn = mysql.createConnection(mysqlCfg);
    const bname = req.params.bname;
    const author = req.params.author;

    // perform validation before query
    //console.log('Console was in Add new Question RestendPoinnt');
    //console.log(req.body);
    const requiredFields = ['question' , 'answer_one', 'answer_two', 'answer_three', 'answer_four'];

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

    console.log(req.body);
    conn.query(
        //'insert into question_banks(bname,no_of_questions,author) values [?]',
        `insert into ${bname}_${author} set ?`,
        req.body,
        (err) => {
            if (err) throw err; // results in HTTP response code 500

            
            //resp.end(); // ends the response, and sends HTTP response code 200 with out any content
        });

    conn.query(
        //'insert into question_banks(bname,no_of_questions,author) values [?]',
        `UPDATE question_banks set no_of_questions = (no_of_questions + 1) where bname = '${bname}' and author='${author}';`,
        (err) => {
            if (err) throw err; // results in HTTP response code 500
            resp.end(); // ends the response, and sends HTTP response code 200 with out any content
        });


    conn.end();
};