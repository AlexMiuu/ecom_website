const express = require('express');
const { getAllWeapons, createWeapon, deleteWeapon } = require('../controllers/weaponsController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/seall', auth, getAllWeapons);        // Rută protejată pentru a obține toate armele
router.post('/add', auth, admin, createWeapon); // Admin-only: Add new weapon
router.get('/products',getAllWeapons)
router.delete('/:id',auth,admin,deleteWeapon);

module.exports = router;



