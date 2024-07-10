const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

let conn = null;

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tutorials',
        port: 3306
    });
};

// Initialize MySQL connection
initMySQL();

router.post('/login', async (req, res, next) => {
    try {
        const user = req.body;
        const result = conn.query('INSERT INTO users SET ?', user);
        res.json({ message: 'User created successfully', data: result });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
})