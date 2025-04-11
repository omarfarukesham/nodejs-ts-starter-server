<h1 align="center">
  Node.js TypeScript Starter Server 🚀
</h1>

<p align="center">
  A production-ready Node.js server template with TypeScript, Express, MongoDB, and Authentication
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#api-documentation">API Docs</a> •
  <a href="#contributing">Contributing</a>
</p>

## ✨ Key Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin/User)
  - Secure password hashing with bcrypt

- 🏗️ **Architecture & Best Practices**
  - TypeScript for type safety
  - Clean architecture principles
  - Modular project structure
  - Error handling middleware
  - Environment configuration
  
- 🛠️ **Developer Experience**
  - Pre-configured ESLint & Prettier
  - Hot reloading in development
  - Request validation using Zod
  - Ready-to-use CRUD examples

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: Zod
- **Security**: bcrypt, cors
- **Development**: nodemon, prettier

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/your-username/node-typescript-starter.git
cd node-typescript-starter
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configurations
```

4. **Start development server**
```bash
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Protected Routes
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update profile

### Admin Routes
- `GET /api/admin/users` - List all users
- `PATCH /api/admin/users/:id` - Update user status

## 🔒 Error Handling

All API responses follow a consistent format:

```json
{
  "success": boolean,
  "message": "string",
  "statusCode": number,
  "data": object | null,
  "error": object | null
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Created by [Omar Faruk](https://github.com/omarfarukesham)

- GitHub: [@omarfarukesham](https://github.com/omarfarukesham)
- LinkedIn: [Omar Faruk](https://www.linkedin.com/in/omarfaruk7/)

---

<p align="center">
  Made with ❤️ by Omar Faruk
</p>