# Ideamagix Lecture Scheduling System

A full-stack lecture scheduling and course management system developed as part of the **Ideamagix Review Test Assignment**.

The system provides separate panels for **Admin** and **Instructor** with backend validation to prevent an instructor from being assigned multiple lectures on the same date.

---

## 🚀 Live Links

- **Frontend:** https://ideamagix-lecture-scheduling.vercel.app
- **Backend:** https://ideamagix-lecture-scheduling.onrender.com
- **GitHub:** https://github.com/AMAN40011/ideamagix-lecture-scheduling
- **Drive:** https://drive.google.com/drive/folders/16IPEH8fkslqSfW9mlGiCCD8_9Bdte-SI?usp=sharing

The Drive folder contains the screen recording, database dump, and project documentation.

---

## ✨ Features

### Admin
- Secure admin login
- View all instructors
- Create courses
- Add course name, level, description and image
- Schedule multiple lectures/batches for courses
- Assign lectures to instructors
- Select lecture dates
- View all scheduled lectures
- Prevent instructor/date scheduling conflicts

### Instructor
- Secure instructor login
- View assigned lectures
- View course names and lecture dates
- Access only their own assigned lectures

### Scheduling Rule

An instructor cannot have more than one lecture on the same date.

For example:

```text
Rahul → 27 Sep 2026 ✅


## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- HTTP-only Cookies
- CORS

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

## 📁 Project Structure

```text
Ideamagix-Intership project/
├── Client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── Server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── index.js
│
├── .gitignore
└── README.md


## 🔐 Demo Credentials

### Admin

```text
Email: admin@ideamagix.com
Password: Admin@123



Instructor - Rahul
Email: rahul@ideamagix.com
Password: Instructor@123
Instructor - Priya
Email: priya@ideamagix.com
Password: Instructor@123
Instructor - Amit
Email: amit@ideamagix.com
Password: Instructor@123


## ⚙️ Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AMAN40011/ideamagix-lecture-scheduling.git
cd ideamagix-lecture-scheduling


2. Backend Setup
cd Server
npm install

Create a .env file inside the Server folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
PORT=3000
NODE_ENV=development

Start the backend server:

npm start

The backend will run on:

http://localhost:3000
3. Frontend Setup

Open a new terminal:

cd Client
npm install

Create a .env file inside the Client folder:

VITE_API_URL=http://localhost:3000/api

Start the frontend:

npm run dev

The frontend will run on:

http://localhost:5173


📦 Dependencies
Frontend
React
Vite
React Router
Axios
Tailwind CSS
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
CORS
Cookie Parser


🛣️ Frontend Routes
/login
/admin
/admin/add-course
/admin/schedule-lecture
/instructor


🔗 Backend API Routes
Authentication
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
Courses
GET  /api/courses
POST /api/courses
Instructors
GET /api/users/instructors
Lectures
GET  /api/lectures
POST /api/lectures
GET  /api/lectures/my

## 🧪 Testing

The following functionality has been tested successfully:

### Authentication

- Admin login works correctly
- Instructor login works correctly
- Invalid credentials are rejected
- Logout works correctly
- Protected routes require authentication

### Admin

- Admin can view all instructors
- Admin can create courses
- Admin can schedule lectures
- Admin can assign instructors to lectures
- Admin can view all scheduled lectures
- Admin cannot create duplicate lectures for the same instructor and date

### Instructor

- Instructor can view assigned lectures
- Instructor can only access their own assigned lectures
- Instructor can see course names and lecture dates

### Lecture Scheduling Conflict

The backend prevents an instructor from being assigned more than one lecture on the same date.

Example:

```text
Rahul → 27 Sep 2026 → React Lecture 
Rahul → 27 Sep 2026 → Node.js Lecture 

Priya → 27 Sep 2026 → Node.js Lecture


🗄️ Database

The project uses MongoDB Atlas as the database.

Collections
users
courses
lectures
Database Dump

A MongoDB database dump is included in the provided Google Drive folder.

The dump contains the project data used for testing, including:

users
courses
lectures

The database dump can be restored using MongoDB Database Tools.

Example:

mongorestore --uri="YOUR_MONGODB_CONNECTION_STRING" ideamagix-database-dump/test


🔒 Security
Passwords are hashed using bcrypt
Authentication is handled using JWT
JWT is stored in an HTTP-only cookie
Protected API routes require authentication
Role-based authorization is implemented for Admin and Instructor
Admin-only operations are protected by role middleware
CORS is configured for the deployed frontend
Environment variables are used for sensitive configuration
.env files are excluded from Git using .gitignore
Rahul → 27 Sep 2026 ❌
Priya → 27 Sep 2026 ✅
