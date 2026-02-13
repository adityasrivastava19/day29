# 📝 TaskFlow - JWT-Authenticated Todo Application

A modern, secure todo application built with Node.js, Express, MongoDB, and vanilla JavaScript. Features JWT authentication, beautiful glassmorphism UI, and full CRUD operations.

![TaskFlow Banner](https://img.shields.io/badge/TaskFlow-Todo%20App-blueviolet?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based login and signup system
- 📱 **Modern UI** - Glassmorphism design with smooth animations
- ✅ **Todo Management** - Create, read, and delete tasks
- 🎨 **Beautiful Design** - Gradient backgrounds and premium aesthetics
- 🔒 **Protected Routes** - Secure API endpoints with middleware
- 📊 **User Isolation** - Each user can only access their own todos
- 🚀 **Fast & Responsive** - Optimized for performance
- 💾 **Persistent Storage** - MongoDB database integration

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (Local installation or MongoDB Atlas account)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd data-base-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters
   PORT=5000
   mongoURL=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

   > ⚠️ **Security Note:** Use a strong, random JWT secret (at least 32 characters)

4. **Start the server**
   ```bash
   node server.js
   ```

5. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## 📁 Project Structure

```
data-base-1/
├── public/                 # Frontend files
│   ├── index.html         # Login/Signup page
│   ├── dashboard.html     # Todo dashboard
│   ├── styles.css         # CSS styling
│   └── app.js             # Frontend JavaScript
├── auth/                  # Authentication middleware
│   └── auth.js           # JWT verification
├── controller/            # Business logic
│   └── controller.js     # API controllers
├── database/              # Database models
│   └── db.js             # Mongoose schemas
├── routes/                # API routes
│   └── routes.js         # Express routes
├── .env                   # Environment variables
├── server.js             # Main server file
├── package.json          # Dependencies
└── README.md             # This file
```

## 🔌 API Endpoints

### Authentication

#### Signup
```http
POST /api/signup
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User created successfully"
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Todo Operations (Protected Routes)

> 🔒 All todo endpoints require authentication. Include the JWT token in the Authorization header:
> ```
> Authorization: Bearer <your_jwt_token>
> ```

#### Get All Todos
```http
GET /api/todos
Authorization: Bearer <token>
```

**Response:**
```json
{
  "todos": [
    {
      "_id": "65f1234567890abcdef12345",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": false,
      "user": "65f0987654321fedcba98765"
    }
  ]
}
```

#### Add Todo
```http
POST /api/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response:**
```json
{
  "message": "todo is added"
}
```

#### Delete Todo
```http
DELETE /api/delete/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "todo deleted"
}
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment configuration
- **cors** - Cross-Origin Resource Sharing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with glassmorphism effects
- **Vanilla JavaScript** - Frontend logic
- **Google Fonts (Inter)** - Typography

## 🎨 Design Features

- **Glassmorphism UI** - Modern frosted glass effect
- **Gradient Backgrounds** - Dynamic, animated gradients
- **Smooth Animations** - Micro-interactions for better UX
- **Responsive Design** - Works on all screen sizes
- **Custom Notifications** - Toast messages for user feedback
- **Loading States** - Visual feedback during async operations

## 🔒 Security Features

- ✅ JWT authentication with token expiration (1 hour)
- ✅ Password hashing using bcrypt
- ✅ Protected API routes with middleware
- ✅ XSS protection with HTML escaping
- ✅ User data isolation
- ✅ Environment variable configuration

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT signing | `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` |
| `PORT` | Server port number | `5000` |
| `mongoURL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.net/db` |

## 🚦 Usage Guide

### For New Users

1. Open `http://localhost:5000`
2. Click "Create one" to sign up
3. Fill in your name, username, and password
4. Click "Create Account"
5. Login with your credentials
6. Start adding todos!

### For Returning Users

1. Open `http://localhost:5000`
2. Enter your username and password
3. Click "Sign In"
4. View and manage your todos

## 🧪 Testing the API

### Using cURL

**Signup:**
```bash
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","username":"testuser","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

**Get Todos:**
```bash
curl http://localhost:5000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:5000/api`
3. For protected routes, add Authorization header with Bearer token

## 🐛 Troubleshooting

### Server won't start
- Check if MongoDB is running
- Verify `.env` file exists with correct values
- Ensure port 5000 is not in use

### Cannot connect to MongoDB
- Verify MongoDB connection string in `.env`
- Check network connectivity
- Ensure MongoDB Atlas IP whitelist includes your IP

### Authentication errors
- Clear localStorage and login again
- Check if JWT_SECRET is consistent
- Verify token hasn't expired (1 hour validity)

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.2.1"
}
```

## 🔄 Future Enhancements

- [ ] Update todo functionality
- [ ] Toggle todo status (complete/incomplete)
- [ ] Search and filter todos
- [ ] Due dates and reminders
- [ ] Categories and tags
- [ ] Dark/light theme toggle
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Input validation with express-validator
- [ ] Rate limiting on authentication endpoints
- [ ] Unit and integration tests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

---

**⭐ If you like this project, please give it a star!**
