// routes/todos.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 모든 할 일 가져오기
router.get('/', (req, res) => {
  const query = 'SELECT * FROM todos ORDER BY created_at DESC';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results);
  });
});

// 새로운 할 일 추가하기
router.post('/', (req, res) => {
  const { text } = req.body;
  const query = 'INSERT INTO todos (text) VALUES (?)';
  db.query(query, [text], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(201).json({
      id: results.insertId,
      text,
      completed: false
    });
  });
});

// 할 일 완료/미완료 토글
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const query = 'UPDATE todos SET completed = ? WHERE id = ?';
  db.query(query, [completed, id], (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ id, completed });
  });
});

// 할 일 삭제하기
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM todos WHERE id = ?';
  db.query(query, [id], (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ message: '할 일이 삭제되었습니다.' });
  });
});

module.exports = router;