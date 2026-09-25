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


🔐 Demo Credentials

The project contains seeded accounts for testing.

Admin Account
Email: admin@ideamagix.com
Password: Admin@123
Role: Admin
Instructor - Rahul
Email: rahul@ideamagix.com
Password: Instructor@123
Role: Instructor
Instructor - Priya
Email: priya@ideamagix.com
Password: Instructor@123
Role: Instructor
Instructor - Amit
Email: amit@ideamagix.com
Password: Instructor@123
Role: Instructor

No registration is required for the review. The provided demo accounts can be used directly.

🧪 Recommended Testing Flow

For the easiest review, follow these steps.

Step 1 - Admin Login

Open:

https://ideamagix-lecture-scheduling.vercel.app

Login using:

Email: admin@ideamagix.com
Password: Admin@123
Step 2 - View Instructors

From the Admin Dashboard, view the available instructors.

Current demo instructors:

Rahul Sharma
Priya Patil
Amit Kumar
Step 3 - Create a Course

Create a course by providing:

Course Name
Level
Description
Course Image

After creating the course, lectures/batches can be added.

Step 4 - Schedule a Lecture

Select:

Course
Instructor
Lecture Date

Create the lecture.

Step 5 - Test Scheduling Conflict

Assign a lecture to:

Instructor: Rahul Sharma
Date: 2026-09-27

Then try assigning another lecture to:

Instructor: Rahul Sharma
Date: 2026-09-27

The backend should reject the second lecture because Rahul already has a lecture scheduled on that date.

This validation is enforced at the backend/database level.

Step 6 - Test Same Date With Another Instructor

Now assign another course to:

Instructor: Priya Patil
Date: 2026-09-27

This should be allowed because Priya is a different instructor.

Step 7 - Instructor Login

Logout from the Admin account.

Login using:

Email: rahul@ideamagix.com
Password: Instructor@123

The Instructor Dashboard should display only lectures assigned to Rahul.

🔒 Scheduling Conflict Logic

The most important business rule of the application is:

An instructor cannot have more than one lecture scheduled on the same date.

The backend validates this before creating a lecture.

The Lecture model also contains a unique compound index:

lectureSchema.index(
  { instructor: 1, scheduleDate: 1 },
  { unique: true }
);

This provides an additional database-level protection against duplicate instructor/date combinations.

Example

Allowed:

Rahul → 2026-09-27
Priya → 2026-09-27
Amit  → 2026-09-27

Not allowed:

Rahul → 2026-09-27
Rahul → 2026-09-27

The second Rahul lecture will be rejected.

🔑 Authentication & Authorization

The application uses JWT-based authentication.

Authentication is handled using:

JWT
HTTP-only cookies
bcrypt password hashing
Protected routes
Role-based authorization

There are two primary roles:

Admin

Admin users can:

Manage courses
View instructors
Schedule lectures
View all lectures
Instructor

Instructor users can:

Login
Access the instructor dashboard
View their assigned lectures

Instructor users cannot access admin-only operations.

🌐 Frontend Routes
Route	Access	Description
/	Public	Login page
/admin	Admin	Admin dashboard
/admin/add-course	Admin	Add course
/admin/schedule-lecture	Admin	Schedule lecture
/instructor	Instructor	Instructor dashboard
🔌 Backend API Routes

Base URL:

https://ideamagix-lecture-scheduling.onrender.com/api
Authentication
Login
POST /api/auth/login

Used for Admin and Instructor login.

Get Current User
GET /api/auth/me

Returns the currently authenticated user.

Logout
POST /api/auth/logout

Logs out the authenticated user.

👨‍🏫 Instructor Routes
Get All Instructors
GET /api/instructors

Admin-only endpoint.

Returns the list of instructors available for lecture assignment.

Get Logged-in Instructor Lectures
GET /api/lectures/my

Returns lectures assigned to the authenticated instructor.

📚 Course Routes
Get Courses
GET /api/courses

Returns available courses.

Create Course
POST /api/courses

Admin-only endpoint.

Used to create a new course.

Course information includes:

Name
Level
Description
Image
🗓️ Lecture Routes
Create Lecture
POST /api/lectures

Admin-only endpoint.

Used to assign:

Course
Instructor
Lecture date

The backend validates instructor/date conflicts before creating the lecture.

Get All Lectures
GET /api/lectures

Admin-only endpoint.

Returns all scheduled lectures.

Get My Lectures
GET /api/lectures/my

Instructor endpoint.

Returns lectures assigned to the logged-in instructor.

⚙️ Local Development Setup
1. Clone the repository
git clone https://github.com/AMAN40011/ideamagix-lecture-scheduling.git

Move into the project:

cd ideamagix-lecture-scheduling
🖥️ Backend Setup

Move into the Server directory:

cd Server

Install dependencies:

npm install

Create a .env file:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development

Start the backend:

npm start

The backend will run at:

http://localhost:3000
💻 Frontend Setup

Open another terminal.

Move into Client:

cd Client

Install dependencies:

npm install

Create a .env file:

VITE_API_URL=http://localhost:3000/api

Start the development server:

npm run dev

Frontend will normally run at:

http://localhost:5173
📦 Main Dependencies
Client
react
react-dom
react-router-dom
axios
tailwindcss
vite
Server
express
mongoose
jsonwebtoken
bcryptjs
cookie-parser
cors
dotenv

See package.json files for the complete dependency list and versions.

🗄️ Database

The project uses:

MongoDB
MongoDB Atlas
Mongoose

Main collections:

users
courses
lectures
Users

Stores:

Name
Email
Password hash
Role
Courses

Stores:

Course name
Level
Description
Image
Lectures

Stores:

Course
Instructor
Schedule date
💾 Database Dump

A MongoDB database dump is included in the Google Drive submission folder.

The dump contains the required collections:

users
courses
lectures

Download the database dump from:

https://drive.google.com/drive/folders/16IPEH8fkslqSfW9mlGiCCD8_9Bdte-SI?usp=sharing

The dump can be restored using MongoDB Database Tools.

Example:

mongorestore --uri="YOUR_MONGODB_URI" ./ideamagix-database-dump
🧪 Tested Functionality

The following functionality has been tested:

✅ Admin login
✅ Instructor login
✅ JWT authentication
✅ Logout
✅ Protected frontend routes
✅ Admin authorization
✅ Instructor authorization
✅ Course creation
✅ Instructor listing
✅ Lecture scheduling
✅ Instructor/date conflict prevention
✅ Same date scheduling for different instructors
✅ Instructor-specific lecture listing
✅ Admin lecture listing
✅ MongoDB database connection
✅ Production frontend deployment
✅ Production backend deployment
✅ CORS configuration
✅ API communication between frontend and backend
🚀 Deployment
Frontend

The React frontend is deployed on:

Vercel

https://ideamagix-lecture-scheduling.vercel.app
Backend

The Express API is deployed on:

Render

https://ideamagix-lecture-scheduling.onrender.com
Database

The application uses:

MongoDB Atlas

🎥 Screen Recording

A complete demonstration of the project is available in the Google Drive submission folder.

The recording demonstrates:

Admin login
Admin dashboard
Instructor listing
Course creation
Lecture scheduling
Scheduling conflict validation
Different instructor scheduling
Instructor login
Instructor dashboard
Assigned lecture display

Google Drive:

https://drive.google.com/drive/folders/16IPEH8fkslqSfW9mlGiCCD8_9Bdte-SI?usp=sharing

📄 Project Documentation

Detailed project documentation is also available in the Google Drive submission folder.

It includes:

Project overview
Assignment requirements
Testing credentials
Testing instructions
Architecture
Scheduling logic
Deployment information
Future enhancements

Google Drive:

https://drive.google.com/drive/folders/16IPEH8fkslqSfW9mlGiCCD8_9Bdte-SI?usp=sharing

🔐 Security Notes

Sensitive environment variables are not committed to GitHub.

The following files are excluded using .gitignore:

.env
.env.local
.env.*.local

Sensitive values such as:

MongoDB connection strings
JWT secrets
Production environment variables

are stored only in the deployment environment.

Demo credentials provided in this README are intentionally included for assignment review.

🔮 Future Enhancements

The following features could be added in future versions:

Instructor availability management
Calendar-based scheduling UI
Lecture time slots
Rescheduling and cancellation
Email notifications
Course editing and deletion
Pagination and advanced filtering
Search functionality
Instructor profile management
Course enrollment
Attendance management
Analytics dashboard
Automated schedule optimization
More granular admin permissions
👨‍💻 Developer

Aman Pal

B.Sc. Information Technology
Smt. Chandibhai Himathmal Mansukhani College (CHM College)
University of Mumbai

GitHub

https://github.com/AMAN40011

LinkedIn

https://www.linkedin.com/in/aman-pal-a89a1b252

📬 Assignment Submission
Live Project

https://ideamagix-lecture-scheduling.vercel.app

Backend

https://ideamagix-lecture-scheduling.onrender.com

Source Code

https://github.com/AMAN40011/ideamagix-lecture-scheduling

Submission Files

https://drive.google.com/drive/folders/16IPEH8fkslqSfW9mlGiCCD8_9Bdte-SI?usp=sharing

⭐ Thank You

Thank you for reviewing the Ideamagix Lecture Scheduling & Course Management System.

The project was developed with a focus on:

Clean architecture
Secure authentication
Role-based access
Backend validation
Database integrity
Scheduling conflict prevention
Responsive user experience
Production deployment

### One important change before you send

Your current README already exists on GitHub, so **don't create another README somewhere else**. Replace the contents of the root:

```text
Ideamagix-Intership project/README.md

with the version above, then:

git add README.md
git commit -m "Improve project documentation"
git push origin main
│
├── .gitignore
└── README.md
