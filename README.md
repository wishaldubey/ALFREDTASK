# 📚 Leitner Flashcard Learning App Submission by Vishal Dubey

#LIVE LINK :- 
https://vishalalfredtask.vercel.app

## 🚀 Project Overview
Leitner Flashcard Learning App is a web application that helps users **create, review, and progress through flashcards** using the **Leitner System** for efficient learning.

### 🎯 Features
- Users can **add, update, delete, and review** flashcards.
- Implements the **Leitner System** for spaced repetition.
- Authentication with **JWT (JSON Web Tokens)**.
- Clean **React UI** with Tailwind/Bootstrap.
- Progress tracking for effective learning.
- **Deployed on Render (Backend) & Vercel (Frontend).**
- **Completed Bonus Features:**
  - 🔹 Login System (JWT Auth) – Let users save their progress
  - 🔹 Dark Mode Toggle – Better UX for late-night study sessions
  - 🔹 Animations (Framer Motion) – Smooth transitions when answering flashcards
  - 🔹 Deploy on Vercel/Render – Bonus points for making it live

---

## 🛠 Tech Stack
### **Backend** (Node.js, Express, MongoDB, Mongoose)
- **Express.js** for the REST API.
- **MongoDB + Mongoose** for database operations.
- **JWT authentication** for secure access.
- **bcryptjs** for password hashing.
- **CORS setup** for frontend-backend communication.

### **Frontend** (React, React Hooks, Axios, Tailwind/Bootstrap)
- **React.js** for building the UI.
- **Axios** for API requests.
- **React Hooks** for state management.
- **Tailwind/Bootstrap** for styling.
- **Framer Motion** for animations.
- **Dark Mode Toggle** for enhanced UX.

---

## 🏗️ Local Setup Guide

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/leitner-flashcards.git
cd leitner-flashcards
```

### 2️⃣ Setup Backend
```sh
cd server # Navigate to backend folder
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


