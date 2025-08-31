const mysql = require('mysql2');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agenda',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Create table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS agenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

// Initialize database
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('❌ Error getting database connection:', err);
        reject(err);
        return;
      }

      connection.query(createTableQuery, (err) => {
        connection.release();
        
        if (err) {
          console.error('❌ Error creating table:', err);
          reject(err);
          return;
        }
        
        console.log('✅ Agenda table ready');
        resolve();
      });
    });
  });
};

// Test database connection
const testConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('❌ Error connecting to MySQL:', err);
        reject(err);
        return;
      }
      
      console.log('✅ Connected to MySQL database');
      connection.release();
      resolve();
    });
  });
};

module.exports = {
  pool,
  initializeDatabase,
  testConnection,
};
