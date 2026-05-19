# Chat App

Basic full-stack chat application with a React frontend and Express/MongoDB backend using Socket.IO.

## Project Setup & Install Commands.

Clone the project and install dependencies for both folders:

```bash
cd server
npm install
```

```bash
cd client
npm install
```

## Env Variables

Create a `.env` file inside the `server` folder:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

## Run Backend

```bash
cd server
npm run server
```

Backend runs on:

```txt
http://localhost:4000
```

## Run Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Features

- User registration
- User login
- JWT authentication
- Protected chat page
- Real-time chat with Socket.IO
- Admin dashboard
- View total users
- View total messages
- Delete users from admin dashboard
