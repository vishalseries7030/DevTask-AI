<div align="center">

# 🚀 DevTask AI

### AI-Powered Developer Productivity Platform

*Streamline your development workflow with intelligent task management, bug tracking, and AI-assisted debugging*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-blue?style=for-the-badge)](https://your-vercel-url.vercel.app)
[![Backend API](https://img.shields.io/badge/🔗_API-Documentation-green?style=for-the-badge)](https://your-render-url.onrender.com/health)
[![License](https://img.shields.io/badge/📝_License-MIT-yellow?style=for-the-badge)](LICENSE)

![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=flat-square)
![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-green?style=flat-square&logo=mongodb)
![React](https://img.shields.io/badge/Frontend-React_18-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=flat-square&logo=node.js)
![AI](https://img.shields.io/badge/AI-Gemini_API-orange?style=flat-square&logo=google)

</div>

---

## 📸 Screenshots

> *Add your application screenshots here after deployment*

<div align="center">
  <img src="https://via.placeholder.com/800x450/4F46E5/FFFFFF?text=Dashboard+View" alt="Dashboard" width="45%">
  <img src="https://via.placeholder.com/800x450/10B981/FFFFFF?text=Kanban+Board" alt="Kanban Board" width="45%">
  <img src="https://via.placeholder.com/800x450/F59E0B/FFFFFF?text=AI+Bug+Suggestions" alt="AI Suggestions" width="45%">
  <img src="https://via.placeholder.com/800x450/EF4444/FFFFFF?text=Code+Snippets" alt="Code Snippets" width="45%">
</div>

---

## ✨ Features

### 🎯 Core Functionality
| Feature | Description |
|---------|-------------|
| **🗂️ Project Management** | Create and organize projects with team collaboration |
| **📋 Kanban Board** | Drag-and-drop task management with status tracking |
| **🐛 Bug Tracking** | Comprehensive bug reporting with priority levels |
| **🤖 AI Assistant** | Gemini-powered intelligent bug fix suggestions |
| **📝 Code Snippets** | Save, organize, and share reusable code |
| **🔧 Developer Tools** | JSON formatter, API tester, regex validator |

### 🚀 AI-Powered Intelligence
- **Smart Bug Analysis** - AI analyzes bug descriptions and suggests fixes
- **Code Generation** - Generate code snippets from natural language
- **One-Click Save** - Convert AI suggestions to reusable snippets
- **Daily Quota Management** - Fair usage tracking (3 requests/day)
- **Context-Aware** - AI understands your tech stack and environment

## 🛠️ Tech Stack

<div align="center">

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### AI & Tools
![Google Gemini](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Prism](https://img.shields.io/badge/Prism.js-000000?style=for-the-badge&logo=javascript&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

</div>

### Architecture Highlights
- **RESTful API** with Express.js
- **JWT Authentication** for secure access
- **MongoDB Atlas** for cloud database
- **Gemini AI** integration for intelligent suggestions
- **Responsive Design** with Tailwind CSS
- **Real-time Updates** with optimistic UI
- **Production-Ready** deployment on Vercel + Render

## 🎯 Key Highlights

- ✅ **Production-Ready** - Deployed and running live
- ✅ **AI-Powered** - Gemini API integration for intelligent suggestions
- ✅ **Full-Stack** - Complete MERN stack implementation
- ✅ **Secure** - JWT authentication, bcrypt hashing, rate limiting
- ✅ **Scalable** - MongoDB Atlas cloud database
- ✅ **Modern UI** - Responsive design with Tailwind CSS
- ✅ **Developer-Friendly** - Comprehensive API documentation

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **MongoDB Atlas Account** - [Free tier available](https://www.mongodb.com/cloud/atlas)
- **Gemini API Key** - [Get from Google AI Studio](https://makersuite.google.com/app/apikey)
- **Git** - For version control

## ⚡ Quick Start

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd devtask-ai
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:3000
```

Test backend:
```bash
npm run test:api
```

Start backend:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

### 4. Test the Application

1. Open `http://localhost:3000`
2. Register a new account
3. Create a project
4. Add tasks to Kanban board
5. Report a bug and get AI suggestions!

## 📚 Documentation

- [Backend Setup Guide](backend/SETUP.md)
- [Backend API Testing](backend/API_TEST.md)
- [Frontend README](frontend/README.md)
- [Spec Documentation](.kiro/specs/devtask-ai/)

## 🧪 Testing

### Backend API Test

```bash
cd backend
npm run test:api
```

This verifies:
- MongoDB connection
- All models working
- Data persistence
- Environment variables

### Manual Testing

See [API_TEST.md](backend/API_TEST.md) for detailed API testing with curl commands.

## 🚀 Deployment

### Backend Deployment (Render)

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   ```
   Name: devtask-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables**
   ```env
   NODE_ENV=production
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret_min_32_chars
   GEMINI_API_KEY=your_gemini_api_key
   AI_DAILY_QUOTA=3
   FRONTEND_URL=https://your-app.vercel.app
   ```

4. **Deploy** - Click "Create Web Service"

### Frontend Deployment (Vercel)

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Environment Variable**
   ```env
   VITE_API_URL=https://your-render-backend.onrender.com/api/v1
   ```

4. **Deploy** - Click "Deploy"

### Post-Deployment

1. Update `FRONTEND_URL` in Render with your Vercel URL
2. Test the live application
3. Verify MongoDB data persistence
4. Check AI suggestions are working

**🎉 Your app is now live!**

## 📖 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user

### Projects
- `GET /api/v1/projects` - List projects
- `POST /api/v1/projects` - Create project
- `GET /api/v1/projects/:id` - Get project
- `PUT /api/v1/projects/:id` - Update project

### Tasks
- `GET /api/v1/projects/:projectId/tasks` - List tasks
- `POST /api/v1/projects/:projectId/tasks` - Create task
- `PUT /api/v1/tasks/:taskId` - Update task
- `DELETE /api/v1/tasks/:taskId` - Delete task

### Bugs
- `GET /api/v1/projects/:projectId/bugs` - List bugs
- `POST /api/v1/projects/:projectId/bugs` - Create bug
- `GET /api/v1/bugs/:bugId` - Get bug
- `PUT /api/v1/bugs/:bugId` - Update bug

### AI
- `POST /api/v1/ai/suggest-fix` - Get AI bug fix suggestion
- `POST /api/v1/ai/generate-snippet` - Generate code snippet

### Snippets
- `GET /api/v1/snippets` - List snippets
- `POST /api/v1/snippets` - Create snippet
- `DELETE /api/v1/snippets/:id` - Delete snippet

### Tools
- `POST /api/v1/tools/json-format` - Format JSON
- `POST /api/v1/tools/api-test` - Test API endpoint

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Rate limiting on auth and AI endpoints
- ✅ Input validation
- ✅ CORS protection
- ✅ XSS prevention
- ✅ PII sanitization in AI requests

## 🎯 AI Features

- **Daily Quota**: 3 AI requests per user per day (configurable)
- **Smart Prompts**: Optimized prompts for bug fix suggestions
- **Token Limiting**: Max 700 tokens per response for cost control
- **Caching**: AI responses saved to avoid duplicate requests
- **Usage Tracking**: All AI requests logged for analytics

## 📊 Project Structure

```
devtask-ai/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   ├── app.js           # Express app
│   │   └── server.js        # Server entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React context
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── README.md
└── README.md
```

## 🎓 What I Learned

Building this project taught me:

- **Full-Stack Development** - End-to-end MERN stack implementation
- **AI Integration** - Working with Gemini API and prompt engineering
- **Cloud Deployment** - Production deployment on Vercel and Render
- **Database Design** - MongoDB schema design and relationships
- **Authentication** - JWT-based secure authentication
- **Modern React** - Hooks, Context API, and component architecture
- **API Design** - RESTful API best practices
- **Security** - Rate limiting, input validation, and data protection

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For powerful AI capabilities
- **MongoDB Atlas** - For reliable cloud database
- **Vercel & Render** - For seamless deployment
- **React Community** - For amazing tools and libraries
- **Open Source Community** - For inspiration and support

---

## 📧 Contact & Support

**Developer:** [Your Name]

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/yourprofile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/yourusername)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:your.email@example.com)

**Found a bug?** [Open an issue](https://github.com/yourusername/devtask-ai/issues)

**Have a question?** [Start a discussion](https://github.com/yourusername/devtask-ai/discussions)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Built with ❤️ for developers, by developers**

*Making development workflows smarter, one AI suggestion at a time*

</div>
