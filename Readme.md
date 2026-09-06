# 🎬 Netflix-GPT

An AI-powered Netflix-inspired movie discovery platform built with **React, Redux Toolkit, Firebase Authentication, TMDB API, and LangChain/Groq**.

## 🚀 Live Demo

🔗 **Live:** https://netflix-gpt-uxpn.vercel.app

## ✨ Features

* 🔐 **Firebase Authentication**

  * Email & Password authentication
  * Google authentication
  * Secure backend authentication with JWT
* 🎬 **Netflix-inspired UI**
* 🔎 **AI-powered movie search**
* 🤖 **AI movie recommendations** using LangChain & Groq
* 🎞️ **TMDB API integration** for movie data
* 🧠 **Redux Toolkit** for global state management
* 👤 User profile and avatar management
* 📱 Fully responsive design
* 🍿 Movie categories and personalized recommendations
* 🔒 HTTP-only cookie-based authentication
* ⚡ Optimized API communication with Axios

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* Tailwind CSS
* Axios
* Firebase
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Firebase Admin SDK

### AI & APIs

* LangChain
* Groq
* TMDB API

### Deployment

* Vercel — Frontend
* Render — Backend

## 🏗️ Architecture

```text
User
 │
 ▼
React + Redux
 │
 ├── Firebase Authentication
 │
 ├── TMDB API
 │
 ▼
Express.js Backend
 │
 ├── JWT Authentication
 ├── Firebase Admin
 └── MongoDB
 │
 ▼
LangChain + Groq
 │
 ▼
AI Movie Recommendations
```

## 🔑 Authentication Flow

```text
User Login / Signup
        ↓
Firebase Authentication
        ↓
Firebase ID Token
        ↓
Express Backend
        ↓
Firebase Admin verifies token
        ↓
MongoDB User
        ↓
Backend generates JWT
        ↓
HTTP-only Cookie
        ↓
Authenticated Requests
```

## ⚙️ Environment Variables

### Frontend

Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_TMDB_API_KEY=
VITE_SERVER_URL=
```

### Backend

Create a `.env` file:

```env
PORT=8000
NODE_ENV=production

MONGO_URI=
JWT_SECRET=

CLIENT_URL=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

GROQ_API_KEY=
TMDB_API_KEY=
```

> ⚠️ Never commit `.env`, Firebase private keys, or API keys to GitHub.

## 💻 Installation

Clone the repository:

```bash
git clone https://github.com/AmitMishra99/Netflix-GPT.git
cd Netflix-GPT
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## 📂 Project Structure

```text
Netflix-GPT/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── package.json
│
└── README.md
```

## 🎯 What I Learned

Through this project, I worked with:

* Building a full-stack MERN application
* Firebase authentication and Google OAuth
* JWT-based authentication using HTTP-only cookies
* Redux Toolkit for state management
* REST API development with Express
* MongoDB database design with Mongoose
* AI/LLM integration using LangChain and Groq
* Third-party API integration with TMDB
* CORS and cross-origin authentication
* Production deployment using Vercel and Render
* Environment variable management
* React Router and SPA deployment

## 🔮 Future Improvements

* 🎯 Personalized recommendation engine
* ⭐ Movie ratings and reviews
* ❤️ Watchlist functionality
* 🎥 Movie trailers
* 🕐 Search and watch history
* 🌐 Multi-language support

## 👨‍💻 Author

**Amit Mishra**

Software Engineering Aspirant | Full Stack MERN Developer | AI & LLM Applications 

⭐ If you found this project useful, consider giving the repository a star!
