const express = require('express');
const { getAllWeapons, createWeapon } = require('../controllers/weaponsController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/', auth, getAllWeapons);        // Rută protejată pentru a obține toate armele
router.post('/', auth, admin, createWeapon); // Admin-only: Add new weapon

module.exports = router;



