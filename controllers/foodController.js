const { Food } = require('../database/models');

// Crear comida
async function createFood(req, res) {
  try {
    const food = await Food.create(req.body);
    return res.status(201).json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Listar comidas
async function getAllFoods(req, res) {
  try {
    const foods = await Food.findAll();
    return res.status(200).json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// EDITAR comida
async function updateFood(req, res) {
  const { id } = req.params;
  try {
    // En Postgres `returning` devuelve el registro modificado
    const [count, [updatedFood]] = await Food.update(
      req.body,
      { where: { id }, returning: true }
    );
    if (count === 0) {
      return res.status(404).json({ error: 'Comida no encontrada' });
    }
    return res.json({ food: updatedFood });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// BORRAR comida
async function deleteFood(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Food.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Comida no encontrada' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createFood,
  getAllFoods,
  updateFood,
  deleteFood
};

