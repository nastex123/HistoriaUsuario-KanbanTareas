export function dashboardView() {
  return `
    <div class="dashboard-container h-full flex flex-col">
      <div class="flex gap-gutter h-full overflow-x-auto">
        <!-- To Do column -->
        <div class="kanban-column flex flex-col w-1/4 min-w-[280px] h-full">
          <div class="flex items-center justify-between mb-md">
            <div class="flex items-center gap-2">
              <h3 class="font-title-sm text-title-sm text-on-surface">To Do</h3>
              <span id="todo-count" class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">0</span>
            </div>
          </div>
          <div id="todo-column" class="kanban-dropzone flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar" data-status="todo"></div>
        </div>
        <!-- In Progress column -->
        <div class="kanban-column flex flex-col w-1/4 min-w-[280px] h-full">
          <div class="flex items-center justify-between mb-md">
            <div class="flex items-center gap-2">
              <h3 class="font-title-sm text-title-sm text-on-surface">In Progress</h3>
              <span id="progress-count" class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">0</span>
            </div>
          </div>
          <div id="progress-column" class="kanban-dropzone flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar" data-status="in-progress"></div>
        </div>
        <!-- In Review column -->
        <div class="kanban-column flex flex-col w-1/4 min-w-[280px] h-full">
          <div class="flex items-center justify-between mb-md">
            <div class="flex items-center gap-2">
              <h3 class="font-title-sm text-title-sm text-on-surface">In Review</h3>
              <span id="review-count" class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">0</span>
            </div>
          </div>
          <div id="review-column" class="kanban-dropzone flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar" data-status="in-review"></div>
        </div>
        <!-- Done column -->
        <div class="kanban-column flex flex-col w-1/4 min-w-[280px] h-full">
          <div class="flex items-center justify-between mb-md">
            <div class="flex items-center gap-2">
              <h3 class="font-title-sm text-title-sm text-on-surface">Done</h3>
              <span id="done-count" class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">0</span>
            </div>
          </div>
          <div id="done-column" class="kanban-dropzone flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar" data-status="done"></div>
        </div>
      </div>
    </div>

    <!-- Modal crear tarea (solo admin) -->
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
            <label class="block font-label-md mb-1">Category</label>
            <select id="taskCategory" required class="w-full border border-outline-variant rounded-lg p-2">
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Engineering">Engineering</option>
              <option value="Research">Research</option>
              <option value="Product">Product</option>
              <option value="Legal">Legal</option>
              <option value="Ops">Ops</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block font-label-md mb-1">Status Text</label>
              <input type="text" id="taskStatusText" placeholder="e.g. 2d" class="w-full border border-outline-variant rounded-lg p-2">
            </div>
            <div>
              <label class="block font-label-md mb-1">Status Icon</label>
              <select id="taskStatusIcon" class="w-full border border-outline-variant rounded-lg p-2">
                <option value="">Default</option>
                <option value="schedule">Schedule</option>
                <option value="hourglass_empty">Hourglass</option>
                <option value="rate_review">Review</option>
                <option value="check_circle">Check</option>
                <option value="pending">Pending</option>
                <option value="priority_high">Priority</option>
                <option value="bolt">Bolt</option>
                <option value="flag">Flag</option>
              </select>
            </div>
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

    <!-- Modal edicion ADMIN (completo) -->
    <div id="editTaskModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden">
      <div class="bg-surface rounded-xl p-6 w-full max-w-md">
        <h3 class="text-headline-md mb-4">Edit Task (Admin)</h3>
        <form id="editTaskForm">
          <input type="hidden" id="editTaskId">
          <div class="mb-4">
            <label class="block font-label-md mb-1">Title</label>
            <input type="text" id="editTitle" required class="w-full border border-outline-variant rounded-lg p-2">
          </div>
          <div class="mb-4">
            <label class="block font-label-md mb-1">Description</label>
            <textarea id="editDesc" rows="3" class="w-full border border-outline-variant rounded-lg p-2"></textarea>
          </div>
          <div class="mb-4">
            <label class="block font-label-md mb-1">Category</label>
            <select id="editCategory" required class="w-full border border-outline-variant rounded-lg p-2">
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Engineering">Engineering</option>
              <option value="Research">Research</option>
              <option value="Product">Product</option>
              <option value="Legal">Legal</option>
              <option value="Ops">Ops</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block font-label-md mb-1">Status</label>
            <select id="editStatus" required class="w-full border border-outline-variant rounded-lg p-2">
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block font-label-md mb-1">Status Text</label>
              <input type="text" id="editStatusText" placeholder="e.g. 2d" class="w-full border border-outline-variant rounded-lg p-2">
            </div>
            <div>
              <label class="block font-label-md mb-1">Status Icon</label>
              <select id="editStatusIcon" class="w-full border border-outline-variant rounded-lg p-2">
                <option value="">Default</option>
                <option value="schedule">Schedule</option>
                <option value="hourglass_empty">Hourglass</option>
                <option value="rate_review">Review</option>
                <option value="check_circle">Check</option>
                <option value="pending">Pending</option>
                <option value="priority_high">Priority</option>
                <option value="bolt">Bolt</option>
                <option value="flag">Flag</option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <label class="block font-label-md mb-1">Assign to</label>
            <select id="editAssign" required class="w-full border border-outline-variant rounded-lg p-2">
              <option value="">Select a user</option>
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" id="closeEditModalBtn" class="px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-primary text-on-primary rounded-lg">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal edicion CODER (solo descripcion y estado) -->
    <div id="editTaskCoderModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden">
      <div class="bg-surface rounded-xl p-6 w-full max-w-md">
        <h3 class="text-headline-md mb-4">Edit Task (Coder)</h3>
        <form id="editTaskCoderForm">
          <input type="hidden" id="editCoderTaskId">
          <div class="mb-4">
            <label class="block font-label-md mb-1">Description</label>
            <textarea id="editCoderDesc" rows="3" class="w-full border border-outline-variant rounded-lg p-2"></textarea>
          </div>
          <div class="mb-4">
            <label class="block font-label-md mb-1">Status</label>
            <select id="editCoderStatus" required class="w-full border border-outline-variant rounded-lg p-2">
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block font-label-md mb-1">Status Text</label>
              <input type="text" id="editCoderStatusText" placeholder="e.g. 2d" class="w-full border border-outline-variant rounded-lg p-2">
            </div>
            <div>
              <label class="block font-label-md mb-1">Status Icon</label>
              <select id="editCoderStatusIcon" class="w-full border border-outline-variant rounded-lg p-2">
                <option value="">Default</option>
                <option value="schedule">Schedule</option>
                <option value="hourglass_empty">Hourglass</option>
                <option value="rate_review">Review</option>
                <option value="check_circle">Check</option>
                <option value="pending">Pending</option>
                <option value="priority_high">Priority</option>
                <option value="bolt">Bolt</option>
                <option value="flag">Flag</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" id="closeEditCoderModalBtn" class="px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-primary text-on-primary rounded-lg">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <style>
      .custom-scrollbar::-webkit-scrollbar { width: 6px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc3d7; border-radius: 10px; }
      .task-card { 
        transition: transform 0.2s ease, box-shadow 0.2s ease; 
        position: relative;
        cursor: grab;
        user-select: none;
      }
      .task-card:active { cursor: grabbing; }
      .task-card.dragging {
        opacity: 0.5;
        cursor: grabbing;
      }
      .task-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      .kanban-dropzone {
        min-height: 200px;
        transition: background-color 0.2s ease;
      }
      .kanban-dropzone.drag-over {
        background-color: rgba(59, 130, 246, 0.1);
        border: 2px dashed #3b82f6;
      }
      .edit-task-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(0,0,0,0.05);
        border-radius: 50%;
        padding: 4px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
      }
      .task-card:hover .edit-task-btn { opacity: 1; }
      .category-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 600;
        background-color: #ebddff;
        color: #5b00c5;
      }
      .avatar-group { display: flex; align-items: center; gap: 4px; }
      .avatar { width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; object-fit: cover; }
      .status-label { font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 4px; }
    </style>
  `;
}

export async function initDashboard() {
  const session = localStorage.getItem('riwiflow_session');
  if (!session) return;
  const currentUser = JSON.parse(session);
  const isAdmin = currentUser.role === 'admin';

  const newProjectBtn = document.getElementById('newProjectBtn');
  if (newProjectBtn) {
    newProjectBtn.innerHTML = '<span class="material-symbols-outlined">add</span> New Task';
    if (isAdmin) newProjectBtn.classList.remove('hidden');
    else newProjectBtn.classList.add('hidden');
  }

  let users = [];
  try {
    const res = await fetch('http://localhost:3000/users');
    if (res.ok) users = await res.json();
  } catch (err) { console.error('Error loading users:', err); }

  await loadTasks(users, currentUser, isAdmin);

  if (isAdmin) {
    setupCreateModal(users);
    setupEditAdminModal(users);
    setupDragAndDrop();
  }
  setupEditCoderModal();
}

async function loadTasks(users, currentUser, isAdmin) {
  try {
    const res = await fetch('http://localhost:3000/tasks');
    if (!res.ok) throw new Error('Failed to load tasks');
    let tasks = await res.json();

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

    Object.values(columns).forEach(col => { if (col) col.innerHTML = ''; });
    Object.keys(counts).forEach(key => { if (counts[key]) counts[key].innerText = '0'; });

    tasks.forEach(task => {
      const status = task.status || 'todo';
      const column = columns[status];
      if (!column) return;

      const assignedUser = users.find(u => u.id === task.assignedTo);
      const assigneeName = assignedUser ? assignedUser.name : 'Unknown';
      const assigneeAvatar = assignedUser ? `https://ui-avatars.com/api/?name=${encodeURIComponent(assigneeName)}&background=7c3aed&color=fff&rounded=true&bold=true&size=28` : 'https://via.placeholder.com/28';

      let statusText = task.statusText || '';
      let statusIcon = task.statusIcon || '';

      if (!statusText || !statusIcon) {
        switch (status) {
          case 'todo': statusText = statusText || '2d'; statusIcon = statusIcon || 'schedule'; break;
          case 'in-progress': statusText = statusText || 'Today'; statusIcon = statusIcon || 'hourglass_empty'; break;
          case 'in-review': statusText = statusText || 'Review now'; statusIcon = statusIcon || 'rate_review'; break;
          case 'done': statusText = statusText || 'Completed'; statusIcon = statusIcon || 'check_circle'; break;
          default: statusText = statusText || 'Pending'; statusIcon = statusIcon || 'pending';
        }
      }

      const category = task.category || 'Design';
      const card = document.createElement('div');
      card.className = 'task-card bg-surface border border-outline-variant border-l-4 border-l-primary rounded-xl p-md shadow-sm';
      card.setAttribute('draggable', isAdmin ? 'true' : 'false');
      card.setAttribute('data-task-id', task.id);
      card.setAttribute('data-status', status);

      let showEditBtn = false;
      if (isAdmin) showEditBtn = true;
      else if (currentUser.role === 'user' && task.assignedTo === currentUser.id) showEditBtn = true;

      card.innerHTML = `
        <div class="flex items-start justify-between mb-xs">
          <span class="category-badge">${escapeHtml(category)}</span>
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-outline text-sm">attach_file</span>
            ${showEditBtn ? `<span class="edit-task-btn material-symbols-outlined text-outline hover:text-primary" data-task-id="${task.id}" data-assigned-to="${task.assignedTo}">edit</span>` : ''}
          </div>
        </div>
        <h4 class="font-label-md text-label-md text-on-surface mb-xs">${escapeHtml(task.title || '')}</h4>
        <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">${escapeHtml(task.description || 'No description')}</p>
        <div class="mt-md flex items-center justify-between">
          <div class="avatar-group">
            <img class="avatar" src="${assigneeAvatar}" alt="${assigneeName}">
            <span class="font-label-sm text-label-sm text-outline">${escapeHtml(assigneeName || '')}</span>
          </div>
          <div class="status-label">
            <span class="material-symbols-outlined text-sm">${escapeHtml(statusIcon)}</span>
            <span>${escapeHtml(statusText)}</span>
          </div>
        </div>
      `;
      column.appendChild(card);

      if (counts[status]) {
        const current = parseInt(counts[status].innerText) || 0;
        counts[status].innerText = current + 1;
      }
    });

    document.querySelectorAll('.edit-task-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const taskId = btn.dataset.taskId;
        const assignedTo = btn.dataset.assignedTo;
        if (isAdmin) openEditAdminModal(taskId, users);
        else if (currentUser.role === 'user' && assignedTo === currentUser.id) openEditCoderModal(taskId);
        else alert('You are not allowed to edit this task.');
      });
    });

  } catch (err) { console.error('Error loading tasks:', err); }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function setupDragAndDrop() {
  const cards = document.querySelectorAll('.task-card[draggable="true"]');
  const dropzones = document.querySelectorAll('.kanban-dropzone');
  
  let draggedItem = null;

  cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
      draggedItem = card;
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', card.getAttribute('data-task-id'));
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', (e) => {
      card.classList.remove('dragging');
      draggedItem = null;
      dropzones.forEach(zone => {
        zone.classList.remove('drag-over');
      });
    });
  });

  dropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', (e) => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', async (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      
      const taskId = e.dataTransfer.getData('text/plain');
      const newStatus = zone.getAttribute('data-status');
      const draggedCard = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
      
      if (draggedCard && draggedCard.getAttribute('data-status') !== newStatus) {
        try {
          const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
          const task = await response.json();
          
          task.status = newStatus;
          
          const putResponse = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
          });
          
          if (putResponse.ok) {
            const session = localStorage.getItem('riwiflow_session');
            const currentUser = session ? JSON.parse(session) : null;
            const isAdmin = currentUser?.role === 'admin';
            const usersRes = await fetch('http://localhost:3000/users');
            const updatedUsers = await usersRes.json();
            await loadTasks(updatedUsers, currentUser, isAdmin);
            setupDragAndDrop();
          } else {
            alert('Error moving task');
          }
        } catch (err) {
          console.error('Error:', err);
          alert('Connection error');
        }
      }
    });
  });
}

function setupCreateModal(users) {
  const modal = document.getElementById('taskModal');
  const form = document.getElementById('taskForm');
  const closeBtn = document.getElementById('closeModalBtn');
  const newProjectBtn = document.getElementById('newProjectBtn');
  const assignSelect = document.getElementById('taskAssign');
  const categorySelect = document.getElementById('taskCategory');

  const assignableUsers = users.filter(u => u.role?.toLowerCase() !== 'admin');
  assignSelect.innerHTML = '<option value="">Select a user</option>';
  assignableUsers.forEach(u => {
    const option = document.createElement('option');
    option.value = u.id;
    option.textContent = `${u.name} (${u.email})`;
    assignSelect.appendChild(option);
  });

  if (newProjectBtn) newProjectBtn.onclick = () => modal.classList.remove('hidden');
  closeBtn.addEventListener('click', () => { modal.classList.add('hidden'); form.reset(); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDesc').value.trim();
    const category = categorySelect.value;
    const assignedTo = assignSelect.value;
    const statusText = document.getElementById('taskStatusText').value.trim();
    const statusIcon = document.getElementById('taskStatusIcon').value.trim();

    if (!title || !assignedTo) { alert('Please fill title and assignee'); return; }

    const newTask = { title, description, category, status: 'todo', assignedTo, statusText, statusIcon };
    try {
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      if (res.ok) {
        modal.classList.add('hidden');
        form.reset();
        const session = localStorage.getItem('riwiflow_session');
        const currentUser = session ? JSON.parse(session) : null;
        const isAdmin = currentUser?.role === 'admin';
        const usersRes = await fetch('http://localhost:3000/users');
        const updatedUsers = await usersRes.json();
        await loadTasks(updatedUsers, currentUser, isAdmin);
        setupDragAndDrop();
        
        const assignableUpdated = updatedUsers.filter(u => u.role?.toLowerCase() !== 'admin');
        assignSelect.innerHTML = '<option value="">Select a user</option>';
        assignableUpdated.forEach(u => {
          const option = document.createElement('option');
          option.value = u.id;
          option.textContent = `${u.name} (${u.email})`;
          assignSelect.appendChild(option);
        });
        const editAssignSelect = document.getElementById('editAssign');
        if (editAssignSelect) {
          editAssignSelect.innerHTML = '<option value="">Select a user</option>';
          assignableUpdated.forEach(u => {
            const option = document.createElement('option');
            option.value = u.id;
            option.textContent = `${u.name} (${u.email})`;
            editAssignSelect.appendChild(option);
          });
        }
      } else alert('Error creating task');
    } catch (err) { console.error(err); alert('Server error'); }
  });
}

let currentEditTaskId = null;
function setupEditAdminModal(users) {
  const modal = document.getElementById('editTaskModal');
  const form = document.getElementById('editTaskForm');
  const closeBtn = document.getElementById('closeEditModalBtn');
  const editAssignSelect = document.getElementById('editAssign');

  const assignableUsers = users.filter(u => u.role?.toLowerCase() !== 'admin');
  editAssignSelect.innerHTML = '<option value="">Select a user</option>';
  assignableUsers.forEach(u => {
    const option = document.createElement('option');
    option.value = u.id;
    option.textContent = `${u.name} (${u.email})`;
    editAssignSelect.appendChild(option);
  });

  closeBtn.addEventListener('click', () => { modal.classList.add('hidden'); form.reset(); currentEditTaskId = null; });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentEditTaskId) return;
    const title = document.getElementById('editTitle').value.trim();
    const description = document.getElementById('editDesc').value.trim();
    const category = document.getElementById('editCategory').value;
    const status = document.getElementById('editStatus').value;
    const assignedTo = editAssignSelect.value;
    const statusText = document.getElementById('editStatusText').value.trim();
    const statusIcon = document.getElementById('editStatusIcon').value.trim();

    if (!title || !assignedTo) { alert('Please fill title and assignee'); return; }

    const updatedTask = { title, description, category, status, assignedTo, statusText, statusIcon };
    try {
      const res = await fetch(`http://localhost:3000/tasks/${currentEditTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      });
      if (res.ok) {
        modal.classList.add('hidden');
        form.reset();
        currentEditTaskId = null;
        const session = localStorage.getItem('riwiflow_session');
        const currentUser = session ? JSON.parse(session) : null;
        const isAdmin = currentUser?.role === 'admin';
        const usersRes = await fetch('http://localhost:3000/users');
        const updatedUsers = await usersRes.json();
        await loadTasks(updatedUsers, currentUser, isAdmin);
        setupDragAndDrop();
      } else alert('Error updating task');
    } catch (err) { console.error(err); alert('Server error'); }
  });
}

async function openEditAdminModal(taskId, users) {
  try {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}`);
    if (!res.ok) throw new Error('Task not found');
    const task = await res.json();

    currentEditTaskId = task.id;
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDesc').value = task.description || '';
    document.getElementById('editCategory').value = task.category || 'Design';
    document.getElementById('editStatus').value = task.status || 'todo';
    document.getElementById('editStatusText').value = task.statusText || '';
    document.getElementById('editStatusIcon').value = task.statusIcon || '';

    const assignSelect = document.getElementById('editAssign');
    const assignableUsers = users.filter(u => u.role?.toLowerCase() !== 'admin');
    assignSelect.innerHTML = '<option value="">Select a user</option>';
    assignableUsers.forEach(u => {
      const option = document.createElement('option');
      option.value = u.id;
      option.textContent = `${u.name} (${u.email})`;
      if (u.id === task.assignedTo) option.selected = true;
      assignSelect.appendChild(option);
    });

    document.getElementById('editTaskModal').classList.remove('hidden');
  } catch (err) { console.error(err); alert('Could not load task data'); }
}

let currentCoderTaskId = null;
function setupEditCoderModal() {
  const modal = document.getElementById('editTaskCoderModal');
  const form = document.getElementById('editTaskCoderForm');
  const closeBtn = document.getElementById('closeEditCoderModalBtn');

  closeBtn.addEventListener('click', () => { modal.classList.add('hidden'); form.reset(); currentCoderTaskId = null; });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentCoderTaskId) return;
    const description = document.getElementById('editCoderDesc').value.trim();
    const status = document.getElementById('editCoderStatus').value;
    const statusText = document.getElementById('editCoderStatusText').value.trim();
    const statusIcon = document.getElementById('editCoderStatusIcon').value.trim();

    try {
      const getRes = await fetch(`http://localhost:3000/tasks/${currentCoderTaskId}`);
      if (!getRes.ok) throw new Error('Task not found');
      const task = await getRes.json();
      const updatedTask = { ...task, description, status, statusText, statusIcon };
      const putRes = await fetch(`http://localhost:3000/tasks/${currentCoderTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      });
      if (putRes.ok) {
        modal.classList.add('hidden');
        form.reset();
        currentCoderTaskId = null;
        const session = localStorage.getItem('riwiflow_session');
        const currentUser = session ? JSON.parse(session) : null;
        const isAdmin = currentUser?.role === 'admin';
        const usersRes = await fetch('http://localhost:3000/users');
        const updatedUsers = await usersRes.json();
        await loadTasks(updatedUsers, currentUser, isAdmin);
        if (isAdmin) setupDragAndDrop();
      } else alert('Error updating task');
    } catch (err) { console.error(err); alert('Server error'); }
  });
}

async function openEditCoderModal(taskId) {
  try {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}`);
    if (!res.ok) throw new Error('Task not found');
    const task = await res.json();
    currentCoderTaskId = task.id;
    document.getElementById('editCoderDesc').value = task.description || '';
    document.getElementById('editCoderStatus').value = task.status || 'todo';
    document.getElementById('editCoderStatusText').value = task.statusText || '';
    document.getElementById('editCoderStatusIcon').value = task.statusIcon || '';
    document.getElementById('editTaskCoderModal').classList.remove('hidden');
  } catch (err) { console.error(err); alert('Could not load task data'); }
}