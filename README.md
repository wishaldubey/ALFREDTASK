# 📚 Leitner Flashcard Learning App Submission by Vishal Dubey

# 🚀 LIVE DEMO
[**Click here to try the live demo!**](https://vishalalfredtask.vercel.app)
**(Note:** The backend is hosted on Render, so it may take a few seconds to load on the first boot.)**

## 🎯 Project Overview
This Leitner Flashcard Learning App helps users **create, review, and master information** using the proven **Leitner System** for spaced repetition. It offers a dynamic and engaging way to learn!

### ✨ Key Features
*   ➕ **Create, Edit, & Delete Flashcards:**  Easily manage your study material.
*   🔄 **Leitner System Implementation:** Smartly schedule reviews for optimal retention.
*   🔒 **Secure Authentication (JWT):**  User accounts protected with JWT for secure access.
*   🎨 **Clean & Responsive React UI:**  Intuitive interface with Tailwind/Bootstrap styling.
*   📊 **Progress Tracking:**  Visualize your learning journey and identify areas for improvement.
*   ☁️ **Deployment:**  Backend on Render & Frontend on Vercel for reliability & scalability.
*   🌙 **Bonus Features:**
    *   ✅ Login System (JWT Auth) – Personalized progress tracking.
    *   ✅ Dark Mode Toggle – Comfortable studying, day or night.
    *   ✅ Animations (Framer Motion) – Engaging transitions for a smoother user experience.

---

## ⚙️ Tech Stack
### **Backend** (Node.js, Express, MongoDB, Mongoose)
*   **Express.js:** Robust framework for building the REST API.
*   **MongoDB + Mongoose:**  Flexible database for storing flashcards and user data.
*   **JSON Web Tokens (JWT):** Secure authentication and authorization.
*   **bcryptjs:** Password hashing for enhanced security.
*   **CORS:** Enables communication between the frontend and backend.

### **Frontend** (React, React Hooks, Axios, Tailwind/Bootstrap)
*   **React.js:**  Component-based library for building the user interface.
*   **Axios:**  HTTP client for making API requests.
*   **React Hooks:** Managing state and side effects within functional components.
*   **Tailwind/Bootstrap:**  CSS frameworks for consistent and attractive styling.
*   **Framer Motion:**  Animation library for adding smooth transitions and effects.

---

## 🤔 Thought Process

*   **Leitner System Logic:**  The core logic revolves around updating the `box` property of each flashcard based on whether the user answered correctly or incorrectly. Correct answers move the card to the next box, incorrect answers move it back to the first box.  This dictates the review frequency.
*   **Authentication Flow:**  The registration and login processes handle user creation, password hashing (using bcrypt), and the generation/storage of JWTs.  Subsequent requests require the JWT in the `Authorization` header to verify the user's identity.
*   **Data Management:** MongoDB was chosen for its flexibility in handling document-based data. Mongoose provides a schema-based approach, making it easier to validate data and interact with MongoDB.
*   **UI/UX Considerations:** The design prioritizes a simple and intuitive interface.  Framer Motion enhances the user experience with subtle animations. Dark mode was implemented for user comfort in various lighting conditions.
*   **Deployment Strategy:**  Render was selected for the backend because of its ease of deployment for Node.js applications.  Vercel was chosen for the frontend due to its seamless integration with React and excellent performance.

---

## 🛠️ Local Setup Guide

Follow these steps to get the app running on your local machine.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/wishaldubey/ALFREDTASK.git
```
```bash
cd ALFREDTASK
```

### 2️⃣ Setup Backend
```sh
cd server # Navigate to backend folder
```
```sh
npm install  # Install dependencies
```

#### Configure `.env` (Backend)
Update the `.env` file with your MongoDB URI and JWT Secret:
```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=3000
```

#### Start Backend Server
```sh
npm run dev  # Starts server with Nodemon (for development)
npm start    # Starts server normally
```
Backend will be running at: `http://localhost:3000`

### 3️⃣ Setup Frontend
```sh
cd ..  # Navigate to frontend folder
```
```sh
npm install   # Install dependencies
```

#### Configure `.env` (Frontend)
Update the `.env` file with your backend API URL:
```
VITE_API_URL=http://localhost:3000/api
```

#### Start Frontend Server
```sh
npm run dev
```
Frontend will be running at: `http://localhost:5173`

---

## 📌 API Endpoints
### 🔹 **Auth Routes**
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | User login & token generation |

### 🔹 **Flashcard Routes**
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/api/flashcards` | Add a new flashcard |
| GET    | `/api/flashcards` | Get all flashcards |
| PUT    | `/api/flashcards/:id` | Update flashcard (move to next level if correct) |
| DELETE | `/api/flashcards/:id` | Delete a flashcard |

---


## 📞 Contact

🔗 GitHub: [wishaldubey](https://github.com/wishaldubey)  
📧 Email: dubeyvishal917@gmail.com  
📞 Phone: +91 9987391388


Additionally, I wanted to mention that I have built a language learning app as a side project, which also includes a flashcard feature. You can check it out here:- https://polyglotchad.vercel.app/lessons
