# DevTask AI Frontend

React frontend for DevTask AI - A unified developer productivity platform.

## Tech Stack

- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Beautiful DnD for Kanban board
- Prism.js for syntax highlighting
- React Hot Toast for notifications
- Lucide React for icons

## Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will start on `http://localhost:3000`

## Features

### ✅ Authentication
- User registration and login
- JWT token management
- Protected routes
- Auto-redirect on token expiry

### ✅ Dashboard
- Quick stats overview
- AI quota tracking
- Quick actions
- Recent activity

### ✅ Projects
- Create and manage projects
- Add team members
- Project overview cards

### ✅ Kanban Board
- Drag-and-drop task management
- Three columns: To Do, In Progress, Done
- Task priority indicators
- Due date tracking

### ✅ Bug Tracking
- Report bugs with detailed descriptions
- AI-powered fix suggestions using Gemini
- Save AI suggestions as snippets
- Bug status tracking

### ✅ Code Snippets
- Save reusable code
- Syntax highlighting for 10+ languages
- Filter by language and tags
- Copy to clipboard
- AI-generated snippets from bug fixes

### ✅ Developer Tools (Coming Soon)
- JSON formatter
- Regex tester
- API tester

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── layout/          # Layout components
│   │   ├── projects/        # Project components
│   │   ├── tasks/           # Task/Kanban components
│   │   ├── bugs/            # Bug components
│   │   └── snippets/        # Snippet components
│   ├── context/             # React context
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Building for Production

```bash
npm run build
```

Build output will be in `dist/` directory.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable:
   - `VITE_API_URL` = Your backend URL
4. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Deploy `dist/` folder to Netlify
3. Set environment variables in Netlify dashboard

## Environment Variables

- `VITE_API_URL` - Backend API URL (required)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues
- Verify backend is running on correct port
- Check VITE_API_URL in .env
- Check CORS settings in backend

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Styling Issues
- Rebuild Tailwind: `npm run build`
- Check Tailwind config

## Next Steps

1. ✅ Backend running
2. ✅ Frontend running
3. 🚀 Test full integration
4. 🚀 Deploy to production
