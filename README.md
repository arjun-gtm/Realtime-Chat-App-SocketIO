# Chat App

This is a full-stack chat app project. It has a React frontend in the `client` folder and an Express/MongoDB backend in the `server` folder.

## Tech Used

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- React Hot Toast
- Express
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs

## Pages

### Home Page

File: `client/src/pages/HomePage.jsx`

- Shows a welcome message.
- Shows the logged-in user's name if user data exists in `localStorage`.
- Has a button to go to the chat page.
- Shows an admin button if the logged-in user has the `admin` role.
- Has a logout button that removes the token and user from `localStorage`.

Route:

```txt
/
```

### Login Page

File: `client/src/pages/auth/LoginPage.jsx`

- Lets a user log in with email and password.
- Sends login data to the backend.
- Saves the returned token and user data in `localStorage`.
- Shows success and error messages with toast notifications.
- Sends the user to the home page after login.
- Has a link to the register page.

Route:

```txt
/login
```

### Register Page

File: `client/src/pages/auth/RegisterPage.jsx`

- Lets a new user create an account with name, email, and password.
- Sends register data to the backend.
- Saves the returned token and user data in `localStorage`.
- Shows success and error messages with toast notifications.
- Sends the user to the home page after registration.
- Has a link to the login page.

Route:

```txt
/register
```

### Chat Page

File: `client/src/pages/ChatPage.jsx`

- Protected page. Only logged-in users can open it.
- Shows sample chat messages.
- Lets the user type and send a message.
- Adds the new message to the page state.
- Shows who is signed in.

Route:

```txt
/chat
```

### Admin Dashboard

File: `client/src/pages/admin/AdminDashboard.jsx`

- Protected admin page. Only admin users can open it.
- Fetches all users from the backend.
- Shows total users.
- Shows each user's name and email.
- Lets an admin delete a user.
- Shows success and error messages with toast notifications.

Route:

```txt
/admin
```

## Frontend Routes

File: `client/src/App.jsx`

Current routes:

```txt
/          HomePage
/login     LoginPage
/register  RegisterPage
/chat      ChatPage inside PrivateRoute
/admin     AdminDashboard inside AdminRoute
```

## Route Protection

### Private Route

File: `client/src/routes/PrivateRoutes.jsx`

- Checks if a token exists in `localStorage`.
- If there is no token, sends the user to `/login`.
- If there is a token, shows the protected page.

### Admin Route

File: `client/src/routes/AdminRoute.jsx`

- Checks if a token exists in `localStorage`.
- Checks if the saved user has the `admin` role.
- If there is no token, sends the user to `/login`.
- If the user is not an admin, sends the user to `/`.
- If the user is an admin, shows the admin page.

## Frontend Files

```txt
client/src/main.jsx
client/src/App.jsx
client/src/index.css
client/src/api/axiosInstance.js
client/src/pages/HomePage.jsx
client/src/pages/ChatPage.jsx
client/src/pages/auth/LoginPage.jsx
client/src/pages/auth/RegisterPage.jsx
client/src/pages/admin/AdminDashboard.jsx
client/src/routes/PrivateRoutes.jsx
client/src/routes/AdminRoute.jsx
client/src/assets/hero.png
client/src/assets/react.svg
client/src/assets/vite.svg
```

Important frontend setup:

- `client/src/main.jsx` starts the React app.
- `BrowserRouter` is used for routing.
- `Toaster` is used for toast messages.
- `client/src/api/axiosInstance.js` sets the API base URL to:

```txt
http://localhost:4000/api
```

## Backend Features

### Authentication

Files:

```txt
server/src/routes/authRoute.js
server/src/controllers/authController.js
```

Current auth APIs:

```txt
POST /api/register
POST /api/login
GET  /api/profile
```

Features:

- Register user.
- Login user.
- Hash passwords with bcryptjs.
- Create JWT tokens.
- Get logged-in user profile using auth middleware.

### User Management

Files:

```txt
server/src/routes/userRoute.js
server/src/controllers/userController.js
```

Current user APIs:

```txt
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

Features:

- Admin can get all users.
- Logged-in user can get one user by id.
- Admin can update a user.
- Admin can delete a user.
- Passwords are hidden from user responses.

### Middleware

Files:

```txt
server/src/middlewares/authMiddleware.js
server/src/middlewares/adminMiddleware.js
server/src/middlewares/errorHandler.js
```

Features:

- `authMiddleware` checks the Bearer token.
- `authMiddleware` finds the logged-in user from the token.
- `adminMiddleware` blocks non-admin users.
- `errorHandler` handles backend errors.

### Database

Files:

```txt
server/src/config/db.js
server/src/models/userModel.js
```

Features:

- Connects to MongoDB using `MONGODB_URI`.
- User model has:
  - name
  - email
  - password
  - role
  - timestamps

## Backend Files

```txt
server/index.js
server/constants.js
server/src/config/db.js
server/src/models/userModel.js
server/src/routes/authRoute.js
server/src/routes/userRoute.js
server/src/controllers/authController.js
server/src/controllers/userController.js
server/src/middlewares/authMiddleware.js
server/src/middlewares/adminMiddleware.js
server/src/middlewares/errorHandler.js
```

## Environment Variables

Backend environment variables are stored in `server/.env`.

Example file:

```txt
server/.env.example
```

The backend uses:

```txt
PORT
MONGODB_URI
JWT_SECRET
FRONTEND_URL
```

## How To Run

### Run Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:4000
```

### Run Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Current Notes

- Chat messages are currently frontend-only sample messages.
- Real-time chat is not added yet.
- Admin dashboard currently supports listing and deleting users.
- Login and register store auth data in `localStorage`.
- Protected frontend routes check `localStorage` for token and user role.
