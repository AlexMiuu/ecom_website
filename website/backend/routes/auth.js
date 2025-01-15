const express = require('express');
const { check } = require('express-validator');
const { register, login,updateUserData,getUserData } = require('../controllers/authControllers');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', [
    check('username', 'Username este obligatoriu').not().isEmpty(),
    check('password', 'Parola trebuie să aibă minim 6 caractere').isLength({ min: 6 })
], register);

router.post('/login', [
    check('username', 'Username este obligatoriu').not().isEmpty(),
    check('password', 'Parola este obligatorie').not().isEmpty()
], login);


router.get('/user', auth, getUserData);

// Update User Data Route
router.put('/user', [
    auth,
    // Add validation as necessary
], updateUserData);

module.exports = router;
