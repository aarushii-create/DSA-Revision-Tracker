import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

(async function(){
  try{
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
      multipleStatements: true
    });

    console.log('Connected to MySQL server as', process.env.DB_USER);

    const [dbs] = await conn.execute("SHOW DATABASES LIKE '" + (process.env.DB_NAME || 'leetcode_tracker') + "'");
    console.log('Databases matching name:', dbs);

    if(dbs.length > 0){
      const [tables] = await conn.execute("SHOW TABLES FROM `" + (process.env.DB_NAME || 'leetcode_tracker') + "`");
      console.log('Tables:', tables);
    } else {
      console.log('Database not found.');
    }

    await conn.end();
  }catch(err){
    console.error('Error checking DB:', err.message);
    process.exit(1);
  }
})();
