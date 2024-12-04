// server.js
const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');

// example.js
const exampleRouter = require('./routes/example');

const app = express();

// 미들웨어 설정
app.use(cors());  // CORS 활성화
app.use(express.json());  // JSON 파싱

// 기본 경로 설정
app.get('/', (req, res) => {
  res.json({ message: 'TidyUp API 서버에 오신 것을 환영합니다!' });
});

// 라우터 설정
app.use('/api/todos', todosRouter);
app.use('/api/examples', exampleRouter);

// 서버 포트 설정
const PORT = process.env.PORT || 5000;

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});