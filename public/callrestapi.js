const API_URL = '/api/foods';
let foodsData = [];

// Muestra alerta Bootstrap
function showMessage(msg, type = 'success') {
  document.getElementById('resultMessage').innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${msg}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

// Limpia formulario y vuelve a modo “crear”
function clearForm() {
  document.getElementById('foodForm').reset();
  document.getElementById('foodId').value = '';
  document.getElementById('saveBtn').textContent = 'Guardar';
  document.getElementById('cancelEditBtn').style.display = 'none';
}

// Renderiza la tabla con botones de acción
function renderTable(foods) {
  const tbody = document.querySelector('#foodsTable tbody');
  tbody.innerHTML = '';
  foods.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${f.id}</td>
      <td>${f.name}</td>
      <td>${f.category}</td>
      <td>${f.price}</td>
      <td>${f.description}</td>
      <td>${new Date(f.createdAt).toLocaleString()}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editFood(${f.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteFood(${f.id})">Borrar</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

// GET /api/foods
async function getFoods() {
  try {
    const res = await fetch(API_URL);
    const { foods } = await res.json();
    foodsData = foods;
    renderTable(foods);
  } catch {
    showMessage('Error al cargar comidas', 'danger');
  }
}

// POST /api/foods
async function postFood() {
  const payload = {
    name:        document.getElementById('name').value,
    category:    document.getElementById('category').value,
    price:       parseFloat(document.getElementById('price').value) || 0,
    description: document.getElementById('description').value
  };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(res.statusText);
  showMessage('Comida creada');
  clearForm();
  getFoods();
}

// PUT /api/foods/:id
async function updateFood(id) {
  const payload = {
    name:        document.getElementById('name').value,
    category:    document.getElementById('category').value,
    price:       parseFloat(document.getElementById('price').value) || 0,
    description: document.getElementById('description').value
  };
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(res.statusText);
  showMessage('Comida actualizada');
  clearForm();
  getFoods();
}

// DELETE /api/foods/:id
async function deleteFood(id) {
  if (!confirm('¿Eliminar comida?')) return;
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (res.status !== 204) throw new Error(res.statusText);
  showMessage('Comida borrada', 'warning');
  getFoods();
}

// Carga datos en el formulario para edición
function editFood(id) {
  const f = foodsData.find(x => x.id === id);
  if (!f) return;
  document.getElementById('foodId').value       = f.id;
  document.getElementById('name').value         = f.name;
  document.getElementById('category').value     = f.category;
  document.getElementById('price').value        = f.price;
  document.getElementById('description').value  = f.description;
  document.getElementById('saveBtn').textContent     = 'Actualizar';
  document.getElementById('cancelEditBtn').style.display = 'inline-block';
}

// Manejador de submit (crear o actualizar)
async function saveFood(evt) {
  evt.preventDefault();
  const id = document.getElementById('foodId').value;
  if (id) await updateFood(id);
  else    await postFood();
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('foodForm').addEventListener('submit', saveFood);
  document.getElementById('cancelEditBtn').addEventListener('click', clearForm);
  document.getElementById('loadFoodsBtn').addEventListener('click', getFoods);
  getFoods();
});

