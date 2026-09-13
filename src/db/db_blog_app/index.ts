import mysql from 'mysql2/promise';
import "dotenv/config"

// Create the connection to database
const connection = await mysql.createConnection({
  host      : process.env.host,
  user      : process.env.user,
  database  : process.env.database,
  password  : process.env.password
});

console.log("Database terkoneksi menggunakan password:", process.env.password);

export default connection