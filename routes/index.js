const { Router } = require('express');
const {
  createFood,
  getAllFoods,
  updateFood,
  deleteFood
} = require('../controllers/foodController');

const router = Router();

router.post   ('/foods',      createFood);
router.get    ('/foods',      getAllFoods);
router.put    ('/foods/:id',  updateFood);    // ← EDITAR
router.delete ('/foods/:id',  deleteFood);    // ← BORRAR

module.exports = router;

