const express = require('express');
const router = express.Router();
const uc = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', uc.register);
router.post('/login', uc.login);
router.get('/profile', auth, uc.profile);

module.exports = router;
