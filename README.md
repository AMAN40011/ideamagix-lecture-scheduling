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
Rahul → 27 Sep 2026 ❌
Priya → 27 Sep 2026 ✅
