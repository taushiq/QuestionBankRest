const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = (req, resp) => {
    const bname = req.params.bname;
    const author = req.params.author;
    console.log('bname', bname);

    // cause of an SQL injection:
    // const sql = `select * from customers where customer_id = '${id}'`;

    const sql = `select * from ${bname}_${author}`;
    // console.log('sql', sql);
    const conn = mysql.createConnection(mysqlCfg);
    // conn.query(sql, (err, result) => {
    //     if(err) throw err;
    //     resp.send(result);

    //     // delayed response (deliberate)
    //     // setTimeout(() => resp.send(result[0]), 2000);
    // });

    conn.query(sql,
        (err, rows) => {
            if (err) throw err;
            
            conn.query(`select count(*) as count from ${bname}_${author}`, 
                (err, result)=>{
                    if(err) throw err;

                    conn.query('select bname from question_banks where bname = ?',bname,(err, namevalue)=>{
                        if(err) throw err;

                        resp.json({
                            data: rows,
                            count: result[0].count,
                            name: namevalue[0].bname
                        });

                        conn.end();

                    });


                    

                });

                

        });


};