
const mariadb = require('mariadb');
const db = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'adarsh12345',
  database: 'Invoice',
  connectionLimit: 5
});


// Create table if not exists
db.getConnection()

  .then(conn => {

    conn.query('CREATE TABLE IF NOT EXISTS User (id INT AUTO_INCREMENT, CompanyName VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), imageUrl VARCHAR(255), PRIMARY KEY (id))')

      .then(result => {
        console.log('Table created successfully');
      })

      .catch(err => {
        console.error('Error creating table:', err);
      })

      .finally(() => {
        conn.end();
      });

  })

  .catch(err => {
    console.error('Error connecting to database:', err);
  });


module.exports = db;

