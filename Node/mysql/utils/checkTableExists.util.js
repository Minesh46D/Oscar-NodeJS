import con from "../db/mysqlConnect.js"

export const checkTableExists = ( tableName ) => {
    let res
    con.query( "SHOW TABLES", async ( error, result ) => {
        if( error ) throw error;
        res = result.some(( item ) => Object.values(item).includes(tableName))
    }  )
    return res
} 