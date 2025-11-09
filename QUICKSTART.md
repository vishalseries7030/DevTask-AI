# DevTask AI - Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Get Your API Keys (2 minutes)

### MongoDB Atlas (Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free account
3. Create a free M0 cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string (looks like: `mongodb+srv://username:password@cluster...`)

### Gemini API Key (Free)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key

## Step 2: Setup Backend (1 minute)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env` and add your keys:
```env
MONGO_URI=mongodb+srv://your-connection-string-here
JWT_SECRET=any-random-string-at-least-32-characters-long
GEMINI_API_KEY=your-gemini-api-key-here
```

Test it:
```bash
npm run test:api
```

You should see: ✅ ALL TESTS PASSED!

Start backend:
```bash
npm run dev
```

Keep this terminal open!

## Step 3: Setup Frontend (1 minute)

Open a NEW terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

The default `.env` should work:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start frontend:
```bash
npm run dev
```

## Step 4: Use the App! (1 minute)

1. Open browser: `http://localhost:3000`
2. Click "Sign up"
3. Create account (any email works, no verification needed)
4. You're in! 🎉

### Try These Features:

**Create a Project**
1. Click "Projects" in sidebar
2. Click "New Project"
3. Enter name and description
4. Click "Create Project"

**Add Tasks to Kanban**
1. Open your project
2. Click "New Task"
3. Fill in details
4. Drag tasks between columns!

**Report a Bug with AI**
1. Go to "Bugs" tab in your project
2. Click "Report Bug"
3. Describe the bug (include error messages for better AI suggestions)
4. Click "Report Bug"
5. Open the bug
6. Click "Get AI Suggestion" 🤖
7. Get instant fix suggestions from Gemini AI!

**Save Code Snippets**
1. Click "Snippets" in sidebar
2. Click "New Snippet"
3. Paste your code
4. Select language
5. Add tags
6. Save!

## Troubleshooting

### Backend won't start?
- Check MongoDB connection string is correct
- Verify Gemini API key is valid
- Make sure port 5000 is not in use

### Frontend won't start?
- Check backend is running first
- Verify VITE_API_URL in .env
- Make sure port 3000 is not in use

### Can't login?
- Check backend terminal for errors
- Verify MongoDB is connected
- Try registering a new account

### AI not working?
- Verify GEMINI_API_KEY in backend/.env
- Check you haven't exceeded daily quota (3 requests/day)
- Look at backend terminal for error messages

## What's Next?

### Explore Features
- ✅ Create multiple projects
- ✅ Organize tasks on Kanban board
- ✅ Report bugs and get AI suggestions
- ✅ Build your snippet library
- ✅ Use developer tools (JSON formatter, API tester)

### Deploy to Production
See [README.md](README.md) for deployment instructions to:
- Backend: Render
- Frontend: Vercel

### Customize
- Change AI quota in backend/.env: `AI_DAILY_QUOTA=10`
- Modify colors in frontend/tailwind.config.js
- Add more languages to snippet support

## Need Help?

- 📖 Read [README.md](README.md) for full documentation
- 🔧 Check [backend/API_TEST.md](backend/API_TEST.md) for API testing
- 🐛 Open an issue on GitHub

---

**You're all set! Happy coding! 🚀**
