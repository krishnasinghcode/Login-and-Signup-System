# Backend README

## Table of Contents
1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Running the Server](#running-the-server)
4. [Folder Structure](#folder-structure)
5. [Environment Variables](#environment-variables)
6. [API Documentation](#api-documentation)
7. [Error Handling](#error-handling)
8. [Contributing](#contributing)

---

## Project Overview
This is the backend for the Login and Signup system. It provides API endpoints for user authentication and data management. The backend is built with:

- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/krishnasinghcode/Login-and-Signup-System.git
   cd Login-and-Signup-System
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).
   
---

## Running the Server

To start the server, use the following command:
```bash
npm start
```

The server will run on `http://localhost:4000` by default.

---

## Folder Structure
```
backend/
|── config/
    |── db.js
├── controllers/       
    |── authController.js
├── models/            
    |── userModel.js
├── routes/            
    |── authRoutes.js
├── .env
├── node_modules
├── .gitignore
├── package-lock.json
├── package.json
├── server.js           
└── package.json       
```

---

## Environment Variables

Create a `.env` file in the `backend` directory with the following keys:

```
PORT=4000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```

Replace `your_mongo_connection_string` and `your_jwt_secret_key` with your actual values.

---

## API Documentation

### Base URL
```
http://localhost:4000/api
```

### Endpoints

#### **POST /signup**
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully."
  }
  ```

#### **POST /login**
- **Description**: Authenticates a user.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
#### Reset Password
- User requests password reset → System sends OTP via email.
- User enters OTP → System verifies OTP.
- User submits new password → System updates password.


---

## Error Handling
Errors are returned in the following format:

```json
{
  "error": "Error description"
}
```

Common error codes:
- **400**: Bad Request
- **401**: Unauthorized
- **500**: Internal Server Error

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


