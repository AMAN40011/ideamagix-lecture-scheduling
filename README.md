# Ideamagix - Lecture Scheduling & Course Management System

A full-stack web application developed as part of the **Ideamagix Review Test Assignment**.

The application provides an Admin Panel for managing courses, instructors, and lecture schedules, along with an Instructor Panel where instructors can view their assigned lectures.

A major focus of the system is **lecture scheduling conflict prevention**. The backend ensures that an instructor cannot be assigned more than one lecture on the same date.

---

## 🚀 Live Project

### Frontend
https://ideamagix-lecture-scheduling.vercel.app

### Backend API
https://ideamagix-lecture-scheduling.onrender.com

### GitHub Repository
https://github.com/AMAN40011/ideamagix-lecture-scheduling

### Google Drive - Submission Files
The Google Drive folder contains:

- Screen Recording
- Database Dump
- Project Documentation PDF

https://drive.google.com/drive/folders/16IPEH8fkslqSfW9mlGiCCD8_9Bdte-SI?usp=sharing

---

# 📌 Project Overview

The Ideamagix Lecture Scheduling System is designed to manage courses, instructors, and lecture schedules through separate Admin and Instructor panels.

### Admin can:

- Login securely
- View dashboard statistics
- View all instructors
- Add courses
- Add course details
- Add multiple lectures/batches to a course
- Assign lectures to instructors
- Select lecture dates
- View all scheduled lectures
- Prevent duplicate lecture scheduling for the same instructor and date

### Instructor can:

- Login securely
- Access their instructor dashboard
- View assigned lectures
- View course names
- View lecture dates
- View only lectures assigned to their account

---

# 🎯 Assignment Requirements Covered

The project implements the major requirements of the assignment:

| Requirement | Status |
|---|---|
| Admin Panel | ✅ Completed |
| Course Management | ✅ Completed |
| Add Course Name | ✅ Completed |
| Add Course Level | ✅ Completed |
| Add Course Description | ✅ Completed |
| Add Course Image | ✅ Completed |
| Multiple lectures/batches per course | ✅ Completed |
| Instructor Management | ✅ Completed |
| Assign instructor to lecture | ✅ Completed |
| Assign lecture date | ✅ Completed |
| Prevent instructor/date conflicts | ✅ Completed |
| Instructor Panel | ✅ Completed |
| Instructor-specific lecture list | ✅ Completed |
| Authentication | ✅ Completed |
| Protected routes | ✅ Completed |
| Backend validation | ✅ Completed |
| Database integration | ✅ Completed |
| Production deployment | ✅ Completed |

---

# 🛠️ Technology Stack

## Frontend

- React.js
- Vite
- React Router
- Axios
- Tailwind CSS
- JavaScript (ES6+)

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- HTTP-only Cookies
- CORS

## Deployment

- Vercel - Frontend
- Render - Backend
- MongoDB Atlas - Database

---

# 📂 Project Structure

```text
Ideamagix-Intership project/
│
├── Client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── Server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
