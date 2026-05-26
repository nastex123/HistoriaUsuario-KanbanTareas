# Riwiflow - Kanban Dashboard

A professional task management system built with Vanilla JavaScript, Tailwind CSS, and JSON Server.

## Features
- **Role-Based Access Control (RBAC)**: 
  - **Admins**: Can create and edit tasks.
  - **Users**: View-only access to the Kanban board.
- **Dynamic Routing**: Single Page Application (SPA) architecture using a hash-based router.
- **Kanban Board**: Tasks categorized by status (To Do, In Progress, In Review, Done).
- **Authentication**: Session management using LocalStorage.

## Execution Instructions

1. **Install JSON Server**:
   ```bash
   npm install -g json-server
   ```

2. **Run the Backend**:
   Navigate to the project root and run:
   ```bash
   json-server --watch db.json --port 3000
   ```

3. **Run the Frontend**:
   Open `login.html` using a local server (like Live Server in VS Code).

## Default Credentials
- **Admin**: `test@test.com` / `1111`
- **User**: `test1@test.com` / `1111`

# by: Brandon Carranza & Juan Gale
