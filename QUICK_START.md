# 🚀 Quick Start Guide

## Prerequisites
- Node.js 16+ (Already have it ✅)
- MySQL 8.0 (Already running ✅)
- npm (Already have it ✅)

## Start Both Services

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

Expected output:
```
Server is running on port 5000
Environment: development
```

### Terminal 2: Frontend

```bash
npm run dev
```

Expected output:
```
VITE v7.1.7  ready in XXX ms

➜  Local:   http://localhost:5173/
```

## Access the App

1. Open **http://localhost:5173** in your browser
2. You'll be redirected to login page
3. Click **"Sign Up"** to create your first account
4. Start tracking! 🎯

## First Time Setup Checklist

- [ ] Backend MySQL is running
- [ ] Backend installed with `npm install`
- [ ] Backend initialized with `npm run db:init`
- [ ] Backend `.env` has correct MySQL password
- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend installed with `npm install`
- [ ] Frontend running on `http://localhost:5173`
- [ ] Can create account and log in
- [ ] Can mark problems as solved
- [ ] Data persists after page refresh

## Troubleshooting

### Backend won't start
```bash
# Check if MySQL is running
Get-Service MySQL80

# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run db:init
```

### Frontend won't start
```bash
# Check if port 5173 is in use
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### Login not working
1. Check backend console for errors
2. Open DevTools (F12) → Network tab
3. Try signing up again
4. Check if API calls are succeeding

### Data not saving
1. Open DevTools (F12) → Console tab
2. Check for error messages
3. Verify backend is still running
4. Refresh page and try again

## File Locations

- **Backend starts**: `backend/src/server.js`
- **Frontend starts**: `src/main.jsx`
- **Database config**: `backend/.env`
- **Frontend config**: `.env.local`
- **Database schema**: `backend/db/schema.sql`
- **Database init script**: `backend/db/init.js`

## Key Routes

| Page | URL | Requires Login |
|------|-----|---|
| Login | `/login` | No |
| Sign Up | `/signup` | No |
| Tracker | `/` | **Yes** |
| Patterns | `/patterns` | **Yes** |
| Roadmap | `/roadmap` | **Yes** |

## Available Commands

### Backend
```bash
npm run dev        # Start in development mode (auto-reload)
npm run start      # Start in production mode
npm run db:init    # Initialize database
```

### Frontend
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Lint code
```

## What's Working

✅ User registration  
✅ User login  
✅ Mark problems solved  
✅ Track spaced repetition reviews  
✅ Interview roadmap progress  
✅ Dark/Light theme (syncs to database)  
✅ Logout  
✅ Protected routes  
✅ Data persistence across devices  

## Next Steps

1. Test the app thoroughly
2. Report any bugs or issues
3. Consider implementing additional features:
   - Password reset
   - User profile page
   - Export/import functionality
   - Problem statistics dashboard
   - Leaderboard (if multi-user)

---

**Everything is set up! Start the backend and frontend above. Happy coding! 🎯**
