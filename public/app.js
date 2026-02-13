// API Configuration
const API_URL = 'http://localhost:5000/api';

// DOM Elements - Auth Page
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');

// DOM Elements - Dashboard Page
const addTodoForm = document.getElementById('addTodoForm');
const todosContainer = document.getElementById('todosContainer');
const emptyState = document.getElementById('emptyState');
const todoCount = document.getElementById('todoCount');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');

// Notification System
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');

// Show Notification
function showNotification(message, type = 'success') {
    notificationMessage.textContent = message;
    notification.className = `notification show ${type}`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Check Authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const currentPage = window.location.pathname;

    if (!token && currentPage.includes('dashboard')) {
        window.location.href = 'index.html';
    } else if (token && currentPage.includes('index')) {
        window.location.href = 'dashboard.html';
    }
}

// Auth Page Event Listeners
if (showSignupLink) {
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });
}

if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
}

// Signup Handler
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('signupName').value;
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;

        const submitBtn = signupForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, username, password })
            });

            const data = await response.json();

            if (response.ok) {
                showNotification('Account created successfully! Please login.', 'success');
                setTimeout(() => {
                    signupForm.classList.add('hidden');
                    loginForm.classList.remove('hidden');
                    signupForm.reset();
                }, 1500);
            } else {
                showNotification(data.message || 'Signup failed', 'error');
            }
        } catch (error) {
            showNotification('Network error. Please try again.', 'error');
            console.error('Signup error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Login Handler
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showNotification(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            showNotification('Network error. Please try again.', 'error');
            console.error('Login error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Dashboard: Load User Info
if (userName) {
    const username = localStorage.getItem('username');
    if (username) {
        userName.textContent = username;
    }
}

// Logout Handler
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
}

// Add Todo Handler
if (addTodoForm) {
    addTodoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('todoTitle').value;
        const description = document.getElementById('todoDescription').value;
        const token = localStorage.getItem('token');

        const submitBtn = addTodoForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const response = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description })
            });

            const data = await response.json();

            if (response.ok) {
                showNotification('Task added successfully!', 'success');
                addTodoForm.reset();
                loadTodos();
            } else {
                if (response.status === 401) {
                    showNotification('Session expired. Please login again.', 'error');
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        window.location.href = 'index.html';
                    }, 2000);
                } else {
                    showNotification(data.message || 'Failed to add task', 'error');
                }
            }
        } catch (error) {
            showNotification('Network error. Please try again.', 'error');
            console.error('Add todo error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Load Todos
async function loadTodos() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/todos`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayTodos(data.todos);
        } else {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = 'index.html';
            } else {
                showNotification('Failed to load tasks', 'error');
            }
        }
    } catch (error) {
        showNotification('Network error. Please try again.', 'error');
        console.error('Load todos error:', error);
    }
}

// Display Todos
function displayTodos(todos) {
    if (!todosContainer) return;

    todosContainer.innerHTML = '';

    if (todos.length === 0) {
        emptyState.classList.remove('hidden');
        todoCount.textContent = '0 tasks';
    } else {
        emptyState.classList.add('hidden');
        todoCount.textContent = `${todos.length} task${todos.length !== 1 ? 's' : ''}`;

        todos.forEach(todo => {
            const todoCard = createTodoCard(todo);
            todosContainer.appendChild(todoCard);
        });
    }
}

// Create Todo Card
function createTodoCard(todo) {
    const card = document.createElement('div');
    card.className = 'todo-card';
    card.innerHTML = `
        <div class="todo-header">
            <div>
                <h3 class="todo-title">${escapeHtml(todo.title)}</h3>
            </div>
        </div>
        <p class="todo-description">${escapeHtml(todo.description)}</p>
        <button class="btn btn-delete" data-id="${todo._id}">
            <span>🗑️ Delete</span>
        </button>
    `;

    const deleteBtn = card.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => deleteTodo(todo._id));

    return card;
}

// Delete Todo
async function deleteTodo(id) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            showNotification('Task deleted successfully!', 'success');
            loadTodos();
        } else {
            const data = await response.json();
            showNotification(data.message || 'Failed to delete task', 'error');
        }
    } catch (error) {
        showNotification('Network error. Please try again.', 'error');
        console.error('Delete todo error:', error);
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize
checkAuth();

// Load todos if on dashboard
if (todosContainer) {
    loadTodos();
}
