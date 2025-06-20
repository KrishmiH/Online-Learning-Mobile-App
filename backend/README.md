
# 📚 Online Learning Platform API

This API powers an online learning platform with user authentication, course management, and AI-powered course recommendations.

---

## 🚀 API Endpoints

### 🔑 Authentication

#### 1️⃣ Register a new user

**POST** `/api/v1/auth/register`

**Body (JSON)**:
```json
{
  "username": "john_doe",
  "password": "password123",
  "role": "student" // optional: "instructor" or "student"
}
```

---

#### 2️⃣ Login

**POST** `/api/v1/auth/login`

**Body (JSON)**:
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

➡ **Response:** Returns a `token` to use for protected routes.

---

### 📘 Courses

#### 3️⃣ Get all courses

**GET** `/api/v1/courses`

✅ No authentication required.

---

#### 4️⃣ Get a single course

**GET** `/api/v1/courses/:id`

✅ No authentication required.  
➡ Replace `:id` with the actual course ID.

---

#### 5️⃣ Create a course (instructor only)

**POST** `/api/v1/courses`

**Headers**:
```
Authorization: Bearer <your-token>
```

**Body (JSON)**:
```json
{
  "title": "Node.js Basics",
  "description": "Learn the fundamentals of Node.js",
  "content": "Full course content goes here."
}
```

---

#### 6️⃣ Update a course (instructor only)

**PATCH** `/api/v1/courses/:id`

**Headers**:
```
Authorization: Bearer <your-token>
```

**Body (JSON)**:
```json
{
  "description": "Updated course description"
}
```

---

#### 7️⃣ Delete a course (instructor only)

**DELETE** `/api/v1/courses/:id`

**Headers**:
```
Authorization: Bearer <your-token>
```

---

#### 8️⃣ Enroll in a course (student)

**POST** `/api/v1/courses/:id/enroll`

**Headers**:
```
Authorization: Bearer <your-token>
```

---

#### 9️⃣ Get enrolled courses (student)

**GET** `/api/v1/courses/me/enrolled`

**Headers**:
```
Authorization: Bearer <your-token>
```

---

#### 🔟 Get instructor’s courses

**GET** `/api/v1/courses/me/created`

**Headers**:
```
Authorization: Bearer <your-token>
```

---

### 🤖 ChatGPT

#### 1️⃣ Get course recommendations

**POST** `/api/v1/chatgpt/recommendations`

**Headers**:
```
Authorization: Bearer <your-token>  // optional if protected
Content-Type: application/json
```

**Body (JSON)**:
```json
{
  "prompt": "I want to become a full-stack developer"
}
```

---

## 💡 Postman Flow Suggestion

➡ 1️⃣ Register  
➡ 2️⃣ Login  
➡ 3️⃣ Copy the token  
➡ 4️⃣ Test course & ChatGPT APIs  

---

## 📝 Tips

- Replace `<your-token>` with the JWT token returned from login.
- Example base URL: `http://localhost:5000`
- You can set a Postman collection variable for the token.

---

### ✅ Run your server

```bash
npm start
# or
nodemon server.js
```
