const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
});

connection.connect((error) => {
    if (error) {
        console.error('Eroare la conectarea cu MySQL:', error);
    } else {
        console.log('Conectat la baza de date MySQL!');
    }
});

module.exports = connection;
