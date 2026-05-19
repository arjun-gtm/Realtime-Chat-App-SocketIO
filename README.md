# Chat App

A full-stack realtime chat application built using the MERN stack with Socket.IO for realtime communication and JWT authentication.

---

# Tech Stack

## Frontend
- React.js
- TailwindCSS
- Axios
- React Router DOM
- Socket.IO Client
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- BcryptJS

---

# Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Admin Authorization
- User CRUD Operations
- Realtime Chat using Socket.IO
- Live User Join Events
- Save Chat History in MongoDB
- Fetch Old Messages on Refresh
- Admin Dashboard
- View Total Users
- View Total Messages
- Delete Users from Admin Dashboard

---

# Project Setup & Installation

Clone the project and install dependencies for both frontend and backend.

## Backend Setup

```bash
cd server
npm install
```

## Frontend Setup

```bash
cd client
npm install
```

---

# Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Create a `.env` file inside the `client` folder:

```env
VITE_BACKEND_URL= http://localhost:4000
```

---

# Run Backend

```bash
cd server
npm run dev
```

Backend runs on:

```txt
http://localhost:4000
```

---

# Run Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Admin Access

1. Register a normal user account
2. Open MongoDB collection
3. Change user role from `"user"` to `"admin"`
4. Login again
5. Access Admin Dashboard

---

# Socket.IO Events

## Events Used

### Backend
- `connection`
- `disconnect`
- `send_message`
- `receive_message`
- `user_join`
- `user_joined`

### Frontend
- Listen to realtime messages
- Listen to user join events
- Emit chat messages live

---

# API Endpoints

## Authentication
- `POST /api/register`
- `POST /api/login`
- `GET /api/profile`

## Users
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## Messages
- `GET /api/messages`

---

# Author

Arjun Gautam