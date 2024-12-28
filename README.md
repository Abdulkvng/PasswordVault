# PasswordVault https://passwordsvault.netlify.app/

# 🔐 PasswordVault

Welcome to the PasswordVault! This is a simple web-based application that creates and stores strong passwords on a secured website, hosted at [https://passwordsvault.netlify.app/).

# Secure Auth Starter - Express & React Authentication System 🚀

A robust and secure authentication boilerplate featuring Express.js backend and React frontend integration! Perfect for kickstarting your secure web applications with battle-tested authentication.

### ✨ Key Features
- 🛡️ Battle-tested authentication system
- 🔒 Secure password hashing with bcrypt
- 🚫 Brute force protection with account lockouts
- 🎯 JWT token-based authentication
- 📱 React-ready with static file serving
- 🗄️ SQLite in-memory database
- ⚡ Express.js powered REST API
- 🔄 CORS-enabled for modern web apps

### 🛠️ Tech Stack
- 🖥️ Backend: Node.js + Express
- 🎨 Frontend: React
- 🗃️ Database: SQLite
- 🔑 Security: bcryptjs & JWT

### 📚 How to Use

#### 🚀 Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/secure-auth-starter.git

# Install dependencies
cd secure-auth-starter
npm install

# Install frontend dependencies
cd client
npm install

# Return to root and start the development server
cd ..
npm run dev
```

#### 🔧 Configuration
1. Create a `.env` file in the root directory:
```env
JWT_SECRET=your_super_secret_key
PORT=5000
```

#### 🌐 API Endpoints

**Register a New User**
```javascript
POST /api/register
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```

**Login**
```javascript
POST /api/login
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```

#### 🔒 Security Features Explained
- **Brute Force Protection**: Accounts are automatically locked for 15 minutes after 5 failed login attempts
- **Password Security**: All passwords are hashed using bcrypt with salt rounds of 10
- **JWT Authentication**: Tokens expire after 1 hour for enhanced security
- **Database Security**: Uses prepared statements to prevent SQL injection

### 🏗️ Project Structure
```
secure-auth-starter/
├── server.js           # Express server and main backend logic
├── client/            # React frontend
├── .env              # Environment variables
└── package.json      # Project dependencies
```

### 💻 Development

```bash
# Run backend only
npm run server

# Run frontend only
npm run client

# Run both frontend and backend
npm run dev
```

### 🔍 Testing the API
You can test the API endpoints using curl or Postman:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

# Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'
```

### 🤝 Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### ⚠️ Important Notes
- The SQLite database is in-memory by default, meaning data will be cleared when the server restarts
- For production, consider switching to a persistent database like PostgreSQL
- Always change the JWT_SECRET in production
- Consider adding additional security measures like:
  - Rate limiting
  - Email verification
  - Password strength requirements

### 📝 License
This project is MIT licensed.

---
⭐ Star this repo if you find it helpful!
🔑 Built with security in mind
🚀 Ready for production with minimal configuration

### 🤔 Need Help?
Open an issue or submit a pull request. We're here to help! 

Remember to:
- ⭐ Star this repository
- 🐛 Report bugs by creating issues
- 🔄 Check for updates regularly
- 🤝 Contribute to make it better

Happy coding! 🎉
