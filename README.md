# 🧠 DSA Revision Tracker

A full-stack web application to track your DSA problem-solving progress with an intelligent spaced repetition system for long-term retention and mastery.

![React](https://img.shields.io/badge/React-19.2.1-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.18-38B2AC.svg)

## ✨ Key Features

### 📊 Comprehensive Problem Tracking
- Mark problems as solved with automatic timestamp tracking
- Visual progress statistics across difficulty levels (Easy, Medium, Hard)
- Filter by categories (Arrays, Strings, Trees, etc.) and difficulty
- Real-time progress updates synced to database

### 🔄 Intelligent Spaced Repetition
- **Science-backed intervals**: 1, 3, 7, 14, 30 days
- Automatic due date calculation for reviews
- "Due Today" filter to focus on urgent reviews
- Visual status indicators (solved, due, overdue, completed)

### 🔐 Secure Authentication
- JWT-based authentication system
- User account management
- Secure password handling
- Cross-session persistence

### 💾 Cloud-Backed Data
- All progress stored securely in MySQL database
- Access from any device with your account
- No data loss from browser clearing
- Export/Import functionality for backups

### 🎨 Modern User Interface
- Clean, responsive design with Tailwind CSS
- Dark/Light mode support
- Mobile-friendly interface
- Intuitive problem management

### 📚 Multiple Problem Sets
- **Blind 75**: Essential problems for interviews
- **NeetCode 150**: Comprehensive DSA collection
- **Interview Roadmap**: Curated by company
- **Patterns**: Algorithm pattern classification
- **AlgoMap 100**: Complete DSA curriculum

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MySQL 8.0+

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dsa-revision-tracker
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MySQL credentials
   npm run dev
   ```

3. **Setup Frontend** (in another terminal)
   ```bash
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## 📖 Usage Guide

### Getting Started
1. **Sign Up**: Create your account
2. **Select Problem Set**: Choose from Blind 75, NeetCode 150, or others
3. **Mark Problems**: Click the circle to mark problems as solved
4. **Track Reviews**: Complete spaced repetition reviews

### Understanding Review Status
- 🟢 **Green**: Review completed
- 🟡 **Yellow**: Review due today
- 🔴 **Red**: Review overdue
- ⚪ **Gray**: Future review scheduled

### Spaced Repetition Schedule
- **R1**: 1 day after solving
- **R2**: 3 days after R1
- **R3**: 7 days after R2
- **R4**: 14 days after R3
- **R5**: 30 days after R4

## 🏗️ Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system design, database schema, and API documentation.

## 🛠️ Tech Stack

### Frontend
- **React 19.2.1** - UI framework
- **Vite 5.0.0** - Build tool
- **Tailwind CSS 3.4.18** - Styling
- **React Router 7.10.1** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MySQL 8.0** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📦 Build & Deploy

### Build Frontend
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel deploy
```

The application is configured for easy deployment to Vercel with `vercel.json`.

## 🔗 Project Structure

```
dsa-revision-tracker/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # Context providers
│   │   └── data/          # Problem datasets
│   └── vite.config.js
├── backend/               # Express backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth middleware
│   │   └── config/        # Database config
│   ├── db/                # Database files
│   └── server.js
├── README.md              # This file
└── ARCHITECTURE.md        # Detailed architecture
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/user` - Get current user

### Progress Tracking
- `GET /api/progress/leetcode` - Get all progress
- `POST /api/progress/leetcode` - Update problem
- `DELETE /api/progress/leetcode/:id` - Delete progress

See ARCHITECTURE.md for complete API specification.

## 🎯 Future Enhancements

- [ ] Study streak tracking
- [ ] Performance analytics and insights
- [ ] Custom problem lists
- [ ] Collaborative study groups
- [ ] Mobile native app
- [ ] Weekly review summaries

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Learning! 🚀**
