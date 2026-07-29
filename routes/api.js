const express = require('express');
const router = express.Router();

const komikController = require('../controller/komikController');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const genreController = require('../controller/genreController');

router.post('/register', userController.register);
router.post('/login', userController.login);

//public
router.get('/komik', komikController.getAllKomik);
router.get('/komik/:id', komikController.getKomikById);

// Genre
router.get('/genre', genreController.getAllGenres);

//protected
router.post('/komik', authMiddleware, komikController.createKomik);
router.put('/komik/:id', authMiddleware, komikController.updateKomik);
router.delete('/komik/:id', authMiddleware, komikController.deleteKomik);


module.exports = router;