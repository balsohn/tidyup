// routers/example.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 모든 예시 아이템 가져오기
router.get('/', (req, res) => {
    const query = 'SELECT * FROM examples ORDER BY created_at DESC';
    db.query(query, (error, results) => {
        if(error) {
            res.status(500).json({
                error: error.message
            })
            return;
        }
        res.json(results);
    });
});

// 새로운 아이템 추가
router.post('/', (req, res) => {
    const { text } =req.body;
    const query = 'INSERT INTO examples (text) VALUES (?)';
    db.query(query, [text], (error, results) => {
        if(error) {
            res.status(500).json({
                error: error.message
            });
            return;
        }
        res.status(201).json({
            id: results.insertId,
            text: text
        })
    })
})

// 아이템 삭제
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM examples WHERE id = ?';
    db.query(query, [id], (error) => {
        if(error) {
            res.status(500).json({
                error:  error.message
            })
            return;
        }
        res.json({
            message: '삭제되었습니다.'
        });
    })
})

module.exports = router;
// 다음단계 : server.js에 추가