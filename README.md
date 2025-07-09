# Project Name: Login and Signup System

## Table of Contents
- [Project Name: Login and Signup System](#project-name-login-and-signup-system)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
    - [API Documentation](#api-documentation)
  - [Example: Fetch User Profile](#example-fetch-user-profile)
  - [Contributing](#contributing)
  - [License](#license)

---

## Project Overview
This is a full-stack project that provides a simple login and signup system. The system is divided into two main components:

1. **Frontend**: A React-based web application for user interaction.
2. **Backend**: A Node.js and Express-based API for handling authentication and user data storage usign MongoDB.

---

## Features
- JWT-based authentication to secure API endpoints and enable user session management.
- User signup and login functionality.
- Secure password hashing with bcrypt.
- Form validation and error handling.
- Responsive user interface.

---

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Tools**: Postman (API testing), Git, GitHub

---

## Installation
### Prerequisites
- Node.js and npm installed on your system.
- MongoDB instance running locally or in the cloud.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/krishnasinghcode/Login-and-Signup-System.git
   cd Login-and-Signup-System
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables for the backend (see [Backend README](./backend/README.md) for details).

4. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

5. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

---

## Project Structure
```
project-root/
|── backend/              # Backend code
|    ├── config/
|    ├── controllers/
|    ├── models/
|    ├── routes/
|    ├── server.js
|    └── README.md
|
|── frontend/             # Frontend code
|    ├── src/
|    ├── public/
|    ├── vite.config.js
|    └── README.md
|
|── README.md             # Root README (this file)
```

---

## Usage
1. Open your browser and navigate to `http://localhost:5173` to access the frontend.
2. Use the signup page to create a new user account.
3. Log in using the registered credentials.
4. Interact with the application to test its functionality.


### API Documentation
1. 🔐 User Signup
- url `http://localhost:5000/api/auth/signup`
- data format:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

2. 🔐 User Login
- url `http://localhost:5000/api/auth/login`
- data format:
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```
- sets `accessToken` and `refreshToken` in localStorage.

3. 🔐 Use Access Token in Protected API Call
## Example: Fetch User Profile
- send authentication header with the access token
```js
export const fetchProfile = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.get("http://localhost:5000/api/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};
```
---

## Contributing
We welcome contributions to improve this project. Here’s how you can contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

