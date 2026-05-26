// js/views/dashboard.js
export function dashboardView() {
  return `
    <div class="dashboard-container h-full flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-headline-md">Kanban Board</h2>
        <button id="newTaskBtn" class="bg-primary text-on-primary px-4 py-2 rounded-xl font-label-md flex items-center gap-2 shadow-md hover:opacity-90 transition hidden">
          <span class="material-symbols-outlined">add</span> New Task
        </button>
      </div>
      <div class="flex gap-gutter h-full overflow-x-auto">
        <!-- Columnas -->
        <div class="kanban-column flex flex-col w-1/4 min-w-[280px] h-full">
          <div class="flex items-center justify-between mb-md">
            <div class="flex items-center gap-2">
              <h3 class="font-title-sm text-title-sm text-on-surface">To Do</h3>
              <span id="todo-count" class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">0</span>
            </div>
          </div>
          <div id="todo-column" class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar"></div>
        </div>
        <div class="kanban-column flex flex-col w-1/4 min-w-[280px] h-full">
          <div class="flex items-center justify-between mb-md">
            <div class="flex items-center gap-2">
              <h3 class="font-title-sm text-title-sm text-on-surface">In Progress</h3>
              <span id="progress-count" class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">0</span>
            </div>
          </div>
          <div id="progress-column" class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar"></div>
        </div>
        <div class="kanban-column flex flex-col w-1/4 min-w-[280px] h-full">
          <div class="flex items-center justify-between mb-md">
            <div class="flex items-center gap-2">
              <h3 class="font-title-sm text-title-sm text-on-surface">In Review</h3>
              <span id="review-count" class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">0</span>
            </div>
          </div>
          <div id="review-column" class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar"></div>
        </div>
        <div class="kanban-column flex flex-col w-1/4 min-w-[280px] h-full">
          <div class="flex items-center justify-between mb-md">
            <div class="flex items-center gap-2">
              <h3 class="font-title-sm text-title-sm text-on-surface">Done</h3>
              <span id="done-count" class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">0</span>
            </div>
          </div>
          <div id="done-column" class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar"></div>
        </div>
      </div>
    </div>
    <!-- Modal para crear tarea -->
    <div id="taskModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden">
      <div class="bg-surface rounded-xl p-6 w-full max-w-md">
        <h3 class="text-headline-md mb-4">Create New Task</h3>
        <form id="taskForm">
          <div class="mb-4">
            <label class="block font-label-md mb-1">Title</label>
            <input type="text" id="taskTitle" required class="w-full border border-outline-variant rounded-lg p-2">
          </div>
          <div class="mb-4">
            <label class="block font-label-md mb-1">Description</label>
            <textarea id="taskDesc" rows="3" class="w-full border border-outline-variant rounded-lg p-2"></textarea>
          </div>
          <div class="mb-4">
            <label class="block font-label-md mb-1">Assign to</label>
            <select id="taskAssign" required class="w-full border border-outline-variant rounded-lg p-2">
              <option value="">Select a user</option>
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" id="closeModalBtn" class="px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-primary text-on-primary rounded-lg">Create</button>
          </div>
        </form>
      </div>
    </div>
    <style>
      .custom-scrollbar::-webkit-scrollbar { width: 6px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc3d7; border-radius: 10px; }
      .task-card { transition: transform 0.2s ease; }
      .task-card:hover { transform: translateY(-2px); }
    </style>
  `;
}

// Inicialización del dashboard (carga de tareas y usuarios)
export async function initDashboard() {
  const session = localStorage.getItem('riwiflow_session');
  if (!session) return;
  const user = JSON.parse(session);
  const isAdmin = user.role === 'admin';

  const newTaskBtn = document.getElementById('newTaskBtn');
  if (newTaskBtn) {
    if (isAdmin) newTaskBtn.classList.remove('hidden');
    else newTaskBtn.classList.add('hidden');
  }

  // Cargar usuarios para el select (solo los con rol 'user' o 'User')
  let users = [];
  try {
    const res = await fetch('http://localhost:3000/users');
    if (res.ok) {
      const allUsers = await res.json();
      users = allUsers.filter(u => u.role?.toLowerCase() === 'user');
    }
  } catch (err) {
    console.error('Error loading users:', err);
  }

  // Cargar tareas
  await loadTasks(users);

  // Configurar modal solo si es admin
  if (isAdmin) {
    setupModal(users);
  }
}

async function loadTasks(users) {
  try {
    const res = await fetch('http://localhost:3000/tasks');
    if (!res.ok) throw new Error('Failed to load tasks');
    let tasks = await res.json();

    // Renderizar en columnas
    const columns = {
      todo: document.getElementById('todo-column'),
      'in-progress': document.getElementById('progress-column'),
      'in-review': document.getElementById('review-column'),
      done: document.getElementById('done-column')
    };
    const counts = {
      todo: document.getElementById('todo-count'),
      'in-progress': document.getElementById('progress-count'),
      'in-review': document.getElementById('review-count'),
      done: document.getElementById('done-count')
    };

    // Limpiar columnas
    Object.values(columns).forEach(col => { if (col) col.innerHTML = ''; });
    // Inicializar contadores
    Object.keys(counts).forEach(key => { if (counts[key]) counts[key].innerText = '0'; });

    tasks.forEach(task => {
      const status = task.status || 'todo';
      const column = columns[status];
      if (!column) return;

      // Buscar nombre del usuario asignado
      const assignedUser = users.find(u => u.id === task.assignedTo) || { name: 'Unknown' };
      
      const card = document.createElement('div');
      card.className = 'task-card bg-surface border border-outline-variant rounded-xl p-md shadow-sm';
      card.innerHTML = `
        <div class="flex items-start justify-between mb-xs">
          <span class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">${task.title.substring(0, 20)}</span>
        </div>
        <h4 class="font-label-md text-label-md text-on-surface mb-xs">${task.title}</h4>
        <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">${task.description || 'No description'}</p>
        <div class="mt-md flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-outline">person</span>
            <span class="font-label-sm text-label-sm text-outline">${assignedUser.name}</span>
          </div>
        </div>
      `;
      column.appendChild(card);

      // Actualizar contador
      if (counts[status]) {
        const current = parseInt(counts[status].innerText) || 0;
        counts[status].innerText = current + 1;
      }
    });
  } catch (err) {
    console.error('Error loading tasks:', err);
  }
}

function setupModal(users) {
  const modal = document.getElementById('taskModal');
  const form = document.getElementById('taskForm');
  const closeBtn = document.getElementById('closeModalBtn');
  const newTaskBtn = document.getElementById('newTaskBtn');
  const assignSelect = document.getElementById('taskAssign');

  // Llenar select de usuarios
  assignSelect.innerHTML = '<option value="">Select a user</option>';
  users.forEach(u => {
    const option = document.createElement('option');
    option.value = u.id;
    option.textContent = `${u.name} (${u.email})`;
    assignSelect.appendChild(option);
  });

  newTaskBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    form.reset();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDesc').value.trim();
    const assignedTo = document.getElementById('taskAssign').value;

    if (!title || !assignedTo) {
      alert('Please fill title and assignee');
      return;
    }

    const newTask = {
      title,
      description,
      status: 'todo',
      assignedTo
    };

    try {
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      if (res.ok) {
        modal.classList.add('hidden');
        form.reset();
        // Recargar tareas
        await loadTasks(users);
      } else {
        alert('Error creating task');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  });
}