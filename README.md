
# Feedback Management System

A full-stack **Feedback Management System** built with **MERN (MongoDB, Express, React, Node.js)**.  
This system allows users to submit, view, and update feedback, while admins can manage all feedbacks. It supports **role-based access**, **JWT authentication**, and **rating updates**.

---

## Features

### User Features
- User registration and login
- Submit feedback with comment and rating
- View all submitted feedbacks
- Update own feedback (comment and rating)
- Instant feedback list updates after add or edit

### Admin Features
- Admin login
- View all feedbacks from all users
- Delete any feedback

### General
- JWT-based authentication
- Role-based protected routes
- Responsive and simple UI
- Rating displayed as numbers
- Instant state updates without page reload

---

## Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Axios
- CSS for styling

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication

---

## Project Structure


frontend/
├─ src/
│ ├─ components/
│ │ ├─ navbar/
│ │ ├─ addFeedback/
│ │ └─ feedbackCard/
│ ├─ pages/
│ │ ├─ UserDash.jsx
│ │ ├─ AdminDash.jsx
| | ├─ Home.jsx
│ │ ├─ SignIn.jsx
│ │ ├─ SignUp.jsx
│ ├─ App.jsx
│ └─ main.jsx
backend/
├─ routes/
├─ controllers/
├─ models/
├─ context/
├─ middleware/
└─ server.js



---

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB running locally or Atlas account

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Runs backend on http://localhost:5000

```bash
cd frontend
npm install
npm start
```

Runs frontend on http://localhost:5174


## API Endpoints

### Auth

POST /api/user/register — Register new user

POST /api/user/login — Login user/admin

### Feedback

GET /api/user/myfeedback — Get logged-in user's feedbacks

POST /api/user/feedback — Add new feedback

PUT /api/user/myfeedback/:id — Update feedback (comment + rating)

GET /api/user/feedback— Admin: get all feedbacks (Admin Only)

DELETE /api/user/feedback/:id - Delete Feedback (Admins Only)

## Enviroment Variables 
Create a .env file inside the server folder and add 

PORT = 5000
MongoDB_URL = mongodb+srv://<your_id>:<your_password>@fda.1gl2bnw.mongodb.net/Feedback-Management-System
JWT_SECRET = your_secret_key
ADMIN_KEY = your_secret_key

Usage

Register as a new user or login as admin.

Submit feedback using the form on the dashboard.

Edit or update feedback by clicking Edit.

Admin can view, edit, or delete any feedback.


