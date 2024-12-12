const express = require('express');
const { getAllWeapons, createWeapon } = require('../controllers/weaponsController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllWeapons);        // Rută protejată pentru a obține toate armele
router.post('/', auth, createWeapon);        // Rută protejată pentru a adăuga o nouă armă

module.exports = router;
