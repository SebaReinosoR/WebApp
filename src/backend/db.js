const mysql = require('mysql');

const dbConfig = {
  host:'localhost',
  user:'admin',
  password:'',
  database:'simulab',
};


const connection = mysql.createConnection(dbConfig);

const connectDB = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Connected to MySQL database');
        resolve();
      }
    });
  });
};

const closeDB = () => {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Connection to MySQL database closed');
        resolve();
      }
    });
  });
};

const query = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { connectDB, closeDB, query };