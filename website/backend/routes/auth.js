const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authControllers');

const router = express.Router();

router.post('/register', [
    check('username', 'Username este obligatoriu').not().isEmpty(),
    check('password', 'Parola trebuie să aibă minim 6 caractere').isLength({ min: 6 })
], register);

router.post('/login', [
    check('username', 'Username este obligatoriu').not().isEmpty(),
    check('password', 'Parola este obligatorie').not().isEmpty()
], login);

module.exports = router;
