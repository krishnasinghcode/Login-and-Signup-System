# Frontend README

## Table of Contents
1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Folder Structure](#folder-structure)
5. [Environment Variables](#environment-variables)
6. [Components Documentation](#components-documentation)
7. [Styling](#styling)
8. [Contributing](#contributing)

---

## Project Overview
This is the frontend for the Login and Signup system. It provides a responsive user interface for authentication using modern web technologies. The frontend is built with:

- **React** (via Vite)
- **Tailwind CSS**
- **React Router**

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/krishnasinghcode/Login-and-Signup-System.git
   cd Login-and-Signup-System
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).
   
---

## Running the Application

To start the development server, use the following command:
```bash
npm run dev
```

The application will run on `http://localhost:5173` by default.

---

## Folder Structure
```
frontend/
|── src/
|   |── components/      # Reusable React components
|   |   |── Signup.jsx
|   |   |── Login.jsx
|   |── App.jsx          # Main application component
|   |── main.jsx         # Entry point for React
|   |── index.css
├── .gitignore
├── index.html
├── node_modules
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
```

---

## vite.config.js

in vite.config.js add this line 

```
server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  }
```

Replace `http://localhost:4000` with your backend base URL if different.

---

## Components Documentation

### **Signup.jsx**
- **Purpose**: Handles user registration.
- **Inputs**: `name`, `email`, and `password`.
- **API Call**: `POST /signup`.
- **Features**: Form validation and error handling.

### **Login.jsx**
- **Purpose**: Handles user authentication.
- **Inputs**: `email` and `password`.
- **API Call**: `POST /login`.
- **Features**: Displays success or error messages.

---

## Styling

This project uses Tailwind CSS for styling. To customize styles:
1. Modify the `tailwind.config.js` file for theme extensions.
2. Use utility classes directly in JSX components.

Example:
```jsx
<button className="bg-Accent text-Text p-2 rounded">
  Submit
</button>
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---


