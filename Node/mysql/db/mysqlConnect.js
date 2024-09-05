import mysql from 'mysql2'

const dbName = 'node'

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
})

con.connect(( error ) => {
    if( error ) throw error;
    console.log('------- SQL Connected...')
    con.query("SHOW DATABASES", ( err, result ) => {
        if( err ) throw err;
        if(!result.some(( item ) => item['Database'] === dbName )){
            con.query(`CREATE DATABASE ${dbName}`, ( err, result ) => {
                console.log(`------- Database ${dbName} created...`)
                if( err ) throw err;
            })
        }
        con.query(`USE ${dbName}`)
    } )
} )

export default con
