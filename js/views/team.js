let teamMembers = [];
let currentUser = null;

async function loadUsers() {
    try {
        const session = localStorage.getItem('riwiflow_session');
        if (session) {
            currentUser = JSON.parse(session);
            console.log('Current user:', currentUser);
        }
        
        const response = await fetch('http://localhost:3000/users');
        if (response.ok) {
            teamMembers = await response.json();
            console.log('Users loaded:', teamMembers);
        } else {
            throw new Error('Failed to load users');
        }
    } catch (error) {
        console.error('Error loading users:', error);
        teamMembers = [];
    }
}

async function createUser(name, email, role, password = '1111') {
    if (!name?.trim() || !email?.trim()) {
        alert('Please complete name and email');
        return false;
    }
    
    if (!email.includes('@')) {
        alert('Invalid email');
        return false;
    }
    
    if (teamMembers.some(u => u.email === email)) {
        alert('A user with this email already exists');
        return false;
    }
    
    const newUser = {
        name: name.trim(),
        email: email.trim(),
        role: role.toLowerCase(),
        password: password
    };
    
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });
        
        if (response.ok) {
            const createdUser = await response.json();
            alert(`User "${name}" created successfully`);
            await loadUsers();
            renderTeamContent();
            setupTeamEvents();
            return true;
        } else {
            alert('Error creating user');
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Connection error. Make sure json-server is running on port 3000');
        return false;
    }
}

async function deleteUser(userId) {
    const userToDelete = teamMembers.find(u => u.id === userId);
    if (!userToDelete) return false;
    
    const adminCount = teamMembers.filter(u => u.role === 'admin').length;
    if (userToDelete.role === 'admin' && adminCount === 1) {
        alert('Cannot delete the only administrator');
        return false;
    }
    
    if (confirm(`Delete "${userToDelete.name}"?`)) {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert(`User "${userToDelete.name}" deleted`);
                await loadUsers();
                renderTeamContent();
                setupTeamEvents();
                return true;
            } else {
                alert('Error deleting user');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Connection error');
            return false;
        }
    }
    return false;
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

function getRoleIcon(role) {
    switch(role) {
        case 'admin': return 'shield';
        case 'desarrollador': return 'code';
        case 'diseñador': return 'palette';
        case 'product owner': return 'assignment_ind';
        case 'qa': return 'bug_report';
        default: return 'person';
    }
}

function getRoleDisplayName(role) {
    switch(role) {
        case 'admin': return 'Administrator';
        case 'desarrollador': return 'Developer';
        case 'diseñador': return 'Designer';
        case 'product owner': return 'Product Owner';
        case 'qa': return 'QA';
        default: return role || 'User';
    }
}

function getRoleColorClass(role) {
    switch(role) {
        case 'admin': return 'bg-tertiary-container text-on-tertiary-container';
        case 'desarrollador': return 'bg-primary-container text-on-primary-container';
        case 'diseñador': return 'bg-secondary-container text-on-secondary-container';
        case 'product owner': return 'bg-warning-container text-on-warning-container';
        case 'qa': return 'bg-error-container text-on-error-container';
        default: return 'bg-surface-container-high text-on-surface-variant';
    }
}

function renderTeamContent() {
    const container = document.getElementById('team-content');
    if (!container) return;
    
    const isAdmin = currentUser?.role === 'admin';
    const totalUsers = teamMembers.length;
    const adminCount = teamMembers.filter(u => u.role === 'admin').length;
    const desarrolladorCount = teamMembers.filter(u => u.role === 'desarrollador').length;
    const diseñadorCount = teamMembers.filter(u => u.role === 'diseñador').length;
    const productOwnerCount = teamMembers.filter(u => u.role === 'product owner').length;
    const qaCount = teamMembers.filter(u => u.role === 'qa').length;
    
    container.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div class="bg-surface-container-low rounded-xl p-4">
                <div class="text-label-md text-on-surface-variant">Total Users</div>
                <div class="text-headline-md text-on-surface">${totalUsers}</div>
            </div>
            <div class="bg-surface-container-low rounded-xl p-4">
                <div class="text-label-md text-on-surface-variant">Administrators</div>
                <div class="text-headline-md text-on-surface">${adminCount}</div>
            </div>
            <div class="bg-surface-container-low rounded-xl p-4">
                <div class="text-label-md text-on-surface-variant">Developers</div>
                <div class="text-headline-md text-on-surface">${desarrolladorCount}</div>
            </div>
            <div class="bg-surface-container-low rounded-xl p-4">
                <div class="text-label-md text-on-surface-variant">Designers</div>
                <div class="text-headline-md text-on-surface">${diseñadorCount}</div>
            </div>
            <div class="bg-surface-container-low rounded-xl p-4">
                <div class="text-label-md text-on-surface-variant">Product Owners</div>
                <div class="text-headline-md text-on-surface">${productOwnerCount}</div>
            </div>
            <div class="bg-surface-container-low rounded-xl p-4">
                <div class="text-label-md text-on-surface-variant">QA</div>
                <div class="text-headline-md text-on-surface">${qaCount}</div>
            </div>
        </div>
        
        <div class="bg-surface rounded-xl border border-outline-variant overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-surface-container-low border-b border-outline-variant">
                        <tr class="text-left">
                            <th class="p-3 text-label-md text-on-surface-variant">User</th>
                            <th class="p-3 text-label-md text-on-surface-variant">Email</th>
                            <th class="p-3 text-label-md text-on-surface-variant">Role</th>
                            ${isAdmin ? '<th class="p-3 text-label-md text-on-surface-variant">Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${teamMembers.map(user => `
                            <tr class="border-b border-outline-variant hover:bg-surface-container-hover">
                                <td class="p-3">
                                    <div class="flex items-center gap-2">
                                        <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                                            <span class="material-symbols-outlined text-sm">${getRoleIcon(user.role)}</span>
                                        </div>
                                        <span class="font-medium">${escapeHtml(user.name)}</span>
                                    </div>
                                </td>
                                <td class="p-3 text-body-md text-on-surface-variant">${escapeHtml(user.email)}</td>
                                <td class="p-3">
                                    <span class="inline-block px-2 py-1 rounded-full text-label-sm ${getRoleColorClass(user.role)}">
                                        ${getRoleDisplayName(user.role)}
                                    </span>
                                </td>
                                ${isAdmin ? `
                                    <td class="p-3">
                                        <button class="delete-user-btn text-error hover:bg-error-container p-1 rounded-full transition-colors" data-id="${user.id}">
                                            <span class="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </td>
                                ` : ''}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        ${isAdmin ? `
            <div class="mt-6 text-center">
                <button id="openCreateUserBtn" class="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-full hover:bg-primary-hover transition-all mx-auto">
                    <span class="material-symbols-outlined text-sm">add</span>
                    <span>Create New User</span>
                </button>
            </div>
        ` : ''}
    `;
}

function setupTeamEvents() {
    const isAdmin = currentUser?.role === 'admin';
    
    if (isAdmin) {
        const openBtn = document.getElementById('openCreateUserBtn');
        const modal = document.getElementById('userModal');
        const closeBtn = document.getElementById('closeModalBtn');
        const cancelBtn = document.getElementById('cancelModalBtn');
        const confirmBtn = document.getElementById('confirmCreateBtn');
        
        if (openBtn) {
            openBtn.onclick = () => {
                if (modal) modal.classList.remove('hidden');
            };
        }
        
        const closeModal = () => {
            if (modal) modal.classList.add('hidden');
            const nameInput = document.getElementById('userName');
            const emailInput = document.getElementById('userEmail');
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
        };
        
        if (closeBtn) closeBtn.onclick = closeModal;
        if (cancelBtn) cancelBtn.onclick = closeModal;
        
        if (modal) {
            modal.onclick = (e) => {
                if (e.target === modal) closeModal();
            };
        }
        
        if (confirmBtn) {
            confirmBtn.onclick = async () => {
                const name = document.getElementById('userName')?.value;
                const email = document.getElementById('userEmail')?.value;
                const role = document.getElementById('userRole')?.value;
                const password = document.getElementById('userPassword')?.value;
                
                await createUser(name, email, role, password);
                closeModal();
            };
        }
    }
    
    document.querySelectorAll('.delete-user-btn').forEach(btn => {
        btn.onclick = async () => {
            const userId = btn.dataset.id;
            await deleteUser(userId);
        };
    });
}

export function teamView() {
    return `
        <div class="team-container p-6 h-full overflow-auto" id="team-view-container">
            <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h1 class="text-headline-sm text-on-surface">Team Management</h1>
                    <p class="text-body-md text-on-surface-variant mt-1">Manage your team members and roles</p>
                </div>
            </div>
            
            <div id="team-content">
                <div class="text-center py-12">
                    <div class="animate-pulse">Loading team...</div>
                </div>
            </div>
            
            <div id="userModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden">
                <div class="bg-surface rounded-xl p-6 w-full max-w-md">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-headline-md">Create New User</h3>
                        <button id="closeModalBtn" class="text-on-surface-variant text-2xl">&times;</button>
                    </div>
                    <div class="mb-4">
                        <label class="block font-label-md mb-1">Full Name *</label>
                        <input type="text" id="userName" class="w-full border border-outline-variant rounded-lg p-2 bg-surface" placeholder="Ej: Laura Martinez">
                    </div>
                    <div class="mb-4">
                        <label class="block font-label-md mb-1">Email *</label>
                        <input type="email" id="userEmail" class="w-full border border-outline-variant rounded-lg p-2 bg-surface" placeholder="laura@kanban.com">
                    </div>
                    <div class="mb-4">
                        <label class="block font-label-md mb-1">Role</label>
                        <select id="userRole" class="w-full border border-outline-variant rounded-lg p-2 bg-surface">
                            <option value="desarrollador">Developer</option>
                            <option value="diseñador">Designer</option>
                            <option value="product owner">Product Owner</option>
                            <option value="qa">QA</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block font-label-md mb-1">Password</label>
                        <input type="text" id="userPassword" class="w-full border border-outline-variant rounded-lg p-2 bg-surface" value="1111">
                    </div>
                    <div class="flex justify-end gap-2">
                        <button id="cancelModalBtn" class="px-4 py-2 border rounded-lg">Cancel</button>
                        <button id="confirmCreateBtn" class="px-4 py-2 bg-primary text-on-primary rounded-lg">Create User</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export async function initTeam() {
    console.log('Initializing Team view...');
    await loadUsers();
    renderTeamContent();
    setupTeamEvents();
}