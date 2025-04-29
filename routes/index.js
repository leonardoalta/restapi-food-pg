const { Router } = require('express');
const { createFood, getAllFoods } = require('../controllers/foodController');
const router = Router();

router.post('/foods', createFood);
router.get('/foods', getAllFoods);

module.exports = router;
