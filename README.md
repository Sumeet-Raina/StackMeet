# 🔗 StackMeet

**StackMeet** is a matchmaking app inspired by Tinder — designed to connect users based on shared interests and preferences. The backend is built with **Node.js**, **Express**, and **MongoDB**, and includes secure user authentication and authorization.

---

## 🚀 Features

- 🔐 **Authentication & Authorization** using **JWT** and **bcrypt**
- 🧾 **RESTful API** for user sign-up, login, and connection requestlogic
- 🧩 **MongoDB** database with **Mongoose ODM**, viewable via **MongoDB Compass**
- 📮 Test and explore APIs using **Postman**

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcrypt
- **Testing & Debugging**: Postman, MongoDB Compass

---

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stackmeet.git
   cd stackmeet
   npm install

2. **Run dev environment** 💻

```bash
npm start
```

## 🔮 Coming Soon

### 🌐 Frontend with React and TailwindCSS
A sleek, responsive UI built with **React** and styled using **TailwindCSS**, offering smooth navigation and engaging user experience for matches and messaging.

### ☁️ Deployment on AWS
Frontend will be deployed on **AWS** and use AWS SES to send emails.

### ⏰ Cron Jobs
Scheduled background tasks using **cron jobs** to:
- Send an email to all the users to who have received a friend request previous day

### 💬 Real-Time Chat
Implementing **real-time messaging** between matched users using **WebSockets** or **Socket.io**, enabling instant communication within the app.
