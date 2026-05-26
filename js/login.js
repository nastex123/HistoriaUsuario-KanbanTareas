// Constants for API interaction
const API_URL = 'http://localhost:3000';
const SESSION_KEY = 'riwiflow_session';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.getElementById('error-message');
    const toggleMode = document.getElementById('toggleMode');
    const nameFieldGroup = document.getElementById('nameFieldGroup');
    const roleFieldGroup = document.getElementById('roleFieldGroup');
    const authTitle = document.getElementById('auth-title');
    const authDesc = document.getElementById('auth-desc');
    const submitBtnText = document.getElementById('submitBtnText');
    const toggleText = document.getElementById('toggleText');
    const nameInput = document.getElementById('name');
    const roleSelect = document.getElementById('role');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    let isLoginMode = true;

    // Utility to display UI error messages
    function showError(msg) {
        errorDiv.textContent = msg;
        errorDiv.classList.remove('hidden');
    }

    // Persist session in LocalStorage
    function setSession(user) {
        const sessionData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: (user.role || 'user').toLowerCase(),
            loggedInAt: new Date().toISOString()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    }

    // Handle switching between Login and Registration forms
    if (toggleMode) {
        toggleMode.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            nameFieldGroup.classList.toggle('hidden');
            roleFieldGroup.classList.toggle('hidden');
            nameInput.required = !isLoginMode;
            roleSelect.required = !isLoginMode;

            if (isLoginMode) {
                authTitle.textContent = 'Riwiflow';
                authDesc.textContent = 'Sign in to your professional workspace';
                submitBtnText.textContent = 'Login';
                toggleText.textContent = "Don't have an account?";
                toggleMode.textContent = 'Create an account';
            } else {
                authTitle.textContent = 'Join Riwiflow';
                authDesc.textContent = 'Create your account to start managing tasks';
                submitBtnText.textContent = 'Register';
                toggleText.textContent = "Already have an account?";
                toggleMode.textContent = 'Sign in instead';
            }
            errorDiv.classList.add('hidden');
        });
    }

    // Handle form submission (Login or Register)
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorDiv.classList.add('hidden');
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            try {
                // Verificar conexión básica
                const health = await fetch(`${API_URL}/users?_limit=1`);
                if (!health.ok) throw new Error();

                if (isLoginMode) {
                    const res = await fetch(`${API_URL}/users`);
                    const users = await res.json();
                    const foundUser = users.find(u => u.email === email && u.password === password);
                    
                    if (!foundUser) {
                        showError('Invalid email or password.');
                        return;
                    }
                    setSession(foundUser);
                    window.location.href = 'index.html';
                } else {
                    const name = nameInput.value.trim();
                    const role = roleSelect.value;

                    const checkRes = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
                    const existing = await checkRes.json();
                    if (existing.length > 0) {
                        showError('This email is already registered.');
                        return;
                    }

                    const newUser = { name, email, password, role: role.toLowerCase() };
                    const postRes = await fetch(`${API_URL}/users`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newUser)
                    });
                    
                    const createdUser = await postRes.json();
                    setSession(createdUser);
                    window.location.href = 'index.html';
                }
            } catch (err) {
                showError('Could not connect to database. Is json-server running on port 3000?');
            }
        });
    }
});