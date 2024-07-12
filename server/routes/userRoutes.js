const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = "Test-Login-MySQL"


let conn = null;

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '1234',
    database: 'test',
    port: 3306
  });
};

// Initialize MySQL connection
initMySQL();

// GET all users
router.get('/', async (req, res) => {
  try {
    const result = await conn.query('SELECT * FROM users');
    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      throw { statusCode: 404, message: 'User not found' };
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: 'Something went wrong', error: error.message });
  }
});

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Error hashing password' });
    }

    try {
      const user = { ...req.body, password: hash };
      const result = await conn.query('INSERT INTO users SET ?', user);
      res.json({ message: 'User created successfully', data: result });
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });
});


router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [result] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    bcrypt.compare(password, result[0].password, function (err, isLogin) {
      if (isLogin) {
        var token = jwt.sign({ email: result[0].email }, secret, { expiresIn: '1h' });
        res.json({ status: 'ok', message: 'login success', token })
      } else {
        res.status(401).json({ message: 'passwod failed' })
      }
    });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/authen', (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, secret);
    res.json({ stauts: "ok", decoded })
  } catch (error) {
    res.json({ status: "error", message: error.message })
  }

})


// PUT update user
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = req.body;
    const result = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);
    res.json({ message: 'User updated successfully', data: result[0] });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await conn.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted successfully', data: result[0] });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
