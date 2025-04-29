const { Food } = require('../database/models');

async function createFood(req, res) {
  try {
    const food = await Food.create(req.body);
    res.status(201).json({ food });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getAllFoods(req, res) {
  try {
    const foods = await Food.findAll();
    res.status(200).json({ foods });
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = { createFood, getAllFoods };
