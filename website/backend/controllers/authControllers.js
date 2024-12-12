const connection = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register new user
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        connection.query(query, [username, hashedPassword, email], (error) => {
            if (error) {
                return res.status(500).json({ message: 'Error during registration', error });
            }
            res.status(201).json({ message: 'User successfully registered!' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during registration', error });
    }
};

// Login user with email and password
exports.login = (req, res) => {
    const { email, password } = req.body; // Use email instead of username

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Server error', error });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    });
};

// Fetch user data
exports.getUserData = (req, res) => {
    const query = 'SELECT id, username, email FROM users WHERE id = ?';
    connection.query(query, [req.user.userId], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(results[0]);
    });
};
