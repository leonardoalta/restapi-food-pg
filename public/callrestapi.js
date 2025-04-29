// public/callrestapi.js

// Ruta relativa al endpoint de tu API
const API_URL = '/api/foods';

/**
 * Muestra un mensaje de Bootstrap en el elemento #resultMessage
 * @param {string} message El texto a mostrar
 * @param {'success'|'danger'} type El tipo de alerta
 */
function showMessage(message, type = 'success') {
  document.getElementById('resultMessage').innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
}

/**
 * Rellena la tabla de #usersTable con un array de objetos Food
 * @param {Array} foods Lista de comidas
 */
function renderTable(foods) {
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = '';
  foods.forEach(food => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${food.id}</td>
      <td>${food.name}</td>
      <td>${food.description}</td>
      <td>${food.price}</td>
      <td>${food.category}</td>
      <td>${new Date(food.createdAt).toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * Llama al endpoint GET /api/foods y dibuja la tabla
 */
async function getFoods() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { foods } = await res.json();
    renderTable(foods);
  } catch (err) {
    console.error('Error fetching foods:', err);
    showMessage('Error al cargar comidas', 'danger');
  }
}

/**
 * Envía el formulario #userForm como POST /api/foods
 * @param {Event} e Evento submit
 */
async function postFood(e) {
  e.preventDefault();
  const form = document.getElementById('userForm');
  const data = {
    name:        form.name.value.trim(),
    description: form.description.value.trim(),
    price:       parseFloat(form.price.value) || 0,
    category:    form.category.value.trim()
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await res.json();
    showMessage('Comida creada con éxito');
    form.reset();
    getFoods();
  } catch (err) {
    console.error('Error creating food:', err);
    showMessage('Error al crear comida', 'danger');
  }
}

// Asigna los eventos al cargar la página
document.getElementById('userForm').addEventListener('submit', postFood);
document.getElementById('loadUsersBtn').addEventListener('click', getFoods);

// Carga la lista automáticamente al inicio
getFoods();

