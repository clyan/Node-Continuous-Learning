(async ()=>{
    const mysql = require('mysql2/promise')
    const cfg ={
        host:'localhost',
        port:3306,
        user:'root',
        password:'123456',
        database:'shopping'
    }
    const conn =await mysql.createConnection(cfg)

    const CREATE_SQL = `CREATE TABLE IF NOT EXISTS node_table (
                    id int  NOT NULL AUTO_INCREMENT,
                    name varchar(50) NOT NULL,
                    age  varchar(50)  NULL,
                    PRIMARY KEY(id)
                )`

    const INSERT_SQL = `INSERT INTO node_table(name,age) VALUES(?,?)`;

    const QUERY_SQL =`SELECT * FROM node_table`

    console.log(conn)

    let ret=await conn.execute(CREATE_SQL)
    console.log(ret)

    ret=await conn.execute(INSERT_SQL,['张山','12'])
    console.log(`inset:${ret}`)

   const [rows, fields] = await conn.execute(QUERY_SQL);

    console.log(rows)
    conn.end()
    conn.close()

})()
