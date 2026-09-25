# Ideamagix Online Lecture Scheduling Module

A full-stack MERN application developed as part of the Ideamagix Review Test Assignment.

The application provides an admin panel for managing courses, instructors, lecture batches, and schedules, along with an instructor panel where instructors can view their assigned lectures.

A key feature of the system is **lecture scheduling conflict prevention**, ensuring that an instructor cannot be assigned more than one lecture on the same date.

---

## 🔗 Project Links

### GitHub Repository
https://github.com/AMAN40011/ideamagix-lecture-scheduling

### Live Application
https://ideamagix-lecture-scheduling.vercel.app

### Backend API
https://ideamagix-lecture-scheduling.onrender.com

### Screen Recording
https://drive.google.com/drive/folders/16IPEH8fkslqSfW9mlGiCCD8_9Bdte-SI?usp=sharing

---

# 📌 Project Overview

The Ideamagix Online Lecture Scheduling Module is designed to manage courses, instructors, batches, and lecture schedules.

The system contains two user roles:

- **Admin**
- **Instructor**

### Admin can:

- Login securely
- View all instructors
- Add courses
- Add multiple lecture batches for courses
- Assign instructors to lectures
- Assign lecture dates
- View all scheduled lectures
- Prevent instructor scheduling conflicts

### Instructor can:

- Login securely
- Access the instructor dashboard
- View lectures assigned to them
- View course names
- View batch names
- View scheduled lecture dates

---

# ✨ Features

## 🔐 Authentication & Authorization

- JWT-based authentication
- HTTP-only authentication cookies
- Secure password hashing using bcrypt
- Role-based authorization
- Protected frontend routes
- Protected backend APIs
- Separate Admin and Instructor access

---

## 👨‍💼 Admin Panel

The Admin Dashboard provides a centralized interface for managing the lecture scheduling system.

### Admin Features

- Dashboard overview
- View total courses
- View total instructors
- View scheduled lectures
- View all instructors
- View all scheduled lectures
- Add new courses
- Schedule lectures
- Assign instructors
- Assign batches
- Assign lecture dates

---

## 📚 Course Management

Admin can create courses with:

- Course Name
- Course Level
- Course Description
- Course Image

A course can have multiple lecture batches.

Example:

```text
MERN Stack Development
    ├── Morning Batch
    ├── Evening Batch
    └── Weekend Batch
