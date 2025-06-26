# 📘 Online Learning Mobile App

An AI-powered online course management system built with React Native (Expo) and Express.js. The platform enables **students** to enroll in and explore courses, and allows **instructors** to create and manage courses. Includes role-based login, recommendations, and full mobile functionality.

---

## 🚀 Project Setup & Local Development

### 📦 Requirements

* Node.js v16+
* MongoDB (local or MongoDB Atlas)
* Expo Go (for mobile testing)
* Git & GitHub

### 🛠️ Installation

#### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/learningapp
JWT_SECRET=my_jwt_secret
JWT_EXPIRES_IN=90d
CHATGPT_API_KEY=chatgpt_api_key
```

Start backend:

```bash
npm run dev
```

#### 2. Frontend Setup (Expo)

```bash
cd LearningApp
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app to run on your device.

---

## 🏛️ Architecture Overview

### Frontend

* **Framework**: React Native (Expo)
* **Structure**:

  * `app/student/` – student interface
  * `app/instructor/` – instructor interface
  * `(auth)/` – login/register screens
  * `src/services/` – API wrapper
  * `src/context/` – global auth state
  * `src/styles/` – component-based styles

### Backend

* **Framework**: Express.js
* **Database**: MongoDB with Mongoose
* **Auth**: JWT (with role-based access control)
* **Folder Structure**:

  * `routes/`
  * `controllers/`
  * `models/`
  * `utils/`

---

## 📡 API Endpoints

### 🔐 Auth (`/api/v1/auth`)

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| POST   | `/register` | Register a user |
| POST   | `/login`    | Login a user    |

### 🎓 Courses (`/api/v1/courses`)

| Method | Endpoint       | Access     | Description          |
| ------ | -------------- | ---------- | -------------------- |
| GET    | `/`            | Public     | Get all courses      |
| GET    | `/:id`         | Public     | Get course by ID     |
| POST   | `/`            | Instructor | Create course        |
| PATCH  | `/:id`         | Instructor | Update course        |
| DELETE | `/:id`         | Instructor | Delete course        |
| POST   | `/:id/enroll`  | Student    | Enroll in course     |
| GET    | `/me/enrolled` | Student    | Get enrolled courses |
| GET    | `/me/created`  | Instructor | Get created courses  |

---

## 🗂️ Database Structure (MongoDB)

### Users Collection

```json
{
  "_id": ObjectId,
  "username": String,
  "password": String (hashed),
  "role": "student" | "instructor"
}
```

### Courses Collection

```json
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "content": String,
  "instructor": ObjectId (User),
  "studentsEnrolled": [ObjectId (User)]
}
```

---

## 📽️ Project Demo & Deliverables

✅ [GitHub Repository](https://github.com/KrishmiH/Online-Learning-Mobile-App)

### 📂 Deliverables

1. ✅ Full source code hosted on GitHub.
2. ✅ Fully functional app runs locally with Expo + Node.js.
3. ✅ Complete documentation:

   * Setup & architecture
   * REST API
   * Database structure
4. 🎥 Presentation or live demo highlighting:

   * Student login, course recommendations, and enrollments
   * Instructor dashboard, course creation, and student management

---

## 📜 Git Commit History

> Browse the full commit log here: [Commit History](https://github.com/KrishmiH/Online-Learning-Mobile-App/commits)

---

## 📌 Technologies Used

* **Frontend**: React Native, Expo, React Hook Form
* **Backend**: Node.js, Express.js, MongoDB, JWT
* **Deployment-ready**: Easily deployable with MongoDB Atlas and platforms like Render or Vercel.

---

> Built with ❤️ by Krishmi Hansara
