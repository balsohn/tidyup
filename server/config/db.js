// config/db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',      // 데이터베이스 주소
  user: 'root',          // 데이터베이스 사용자
  password: '1234',          // 데이터베이스 비밀번호
  database: 'tidyup'  // 사용할 데이터베이스 이름
});

// 데이터베이스 연결
connection.connect(error => {
  if (error) {
    console.error('데이터베이스 연결 오류:', error);
    return;
  }
  console.log('데이터베이스가 성공적으로 연결되었습니다.');

  // todos 테이블 생성
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      text VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableQuery, (error, results) => {
    if (error) {
      console.error('테이블 생성 오류:', error);
      return;
    }
    console.log('todos 테이블이 준비되었습니다.');
  });

  // example.js
  const createExamplesTable = `
    CREATE TABLE IF NOT EXISTS examples (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createExamplesTable, (error, results) => {
    if(error) {
        console.error('examples 테이블 생성 오류:', error);
        return;
    }
    console.log('examples 테이블이 준비되었습니다.');
  })



});

module.exports = connection;