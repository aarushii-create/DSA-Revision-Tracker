# 🏗️ DSA Revision Tracker - System Architecture

## Overview

DSA Revision Tracker is a full-stack web application built with React (frontend), Express.js (backend), and MySQL (database). It implements an intelligent spaced repetition system to help users master DSA problems through scientifically-backed learning intervals.

## System Architecture Diagram

```
┌─────────────────────────────────┐
│      Client Browser             │
│  ┌───────────────────────────┐  │
│  │   React Application       │  │
│  │  ├── Components           │  │
│  │  ├── Pages                │  │
│  │  ├── Auth Context         │  │
│  │  └── API Services         │  │
│  └───────────────────────────┘  │
└────────────────┬────────────────┘
                 │ HTTPS
                 │ REST API
                 │ JWT Token
                 ▼
┌─────────────────────────────────┐
│     Express.js Backend          │
│  ┌───────────────────────────┐  │
│  │  Routes & Controllers     │  │
│  │  ├── /api/auth/*          │  │
│  │  ├── /api/progress/*      │  │
│  │  └── /api/interview/*     │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Middleware               │  │
│  │  ├── JWT Verification     │  │
│  │  ├── Error Handler        │  │
│  │  └── CORS                 │  │
│  └───────────────────────────┘  │
└────────────────┬────────────────┘
                 │ mysql2
                 │ Connection Pool
                 ▼
┌─────────────────────────────────┐
│     MySQL Database              │
│  ┌───────────────────────────┐  │
│  │  Tables                   │  │
│  │  ├── users                │  │
│  │  ├── leetcode_progress    │  │
│  │  ├── interview_progress   │  │
│  │  └── user_preferences     │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.1 | UI framework |
| Vite | 5.0.0 | Build tool & dev server |
| React Router | 7.10.1 | Client-side routing |
| Tailwind CSS | 3.4.18 | Styling & responsive design |
| Axios | 1.6.0 | HTTP client |
| Lucide React | 0.556.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.x | Web framework |
| MySQL | 8.0+ | Relational database |
| mysql2 | - | MySQL driver |
| JWT | - | Authentication tokens |
| Bcrypt | - | Password hashing |

---

## Frontend Architecture

### Directory Structure
```
src/
├── main.jsx                    # Application entry point
├── App.jsx                     # Main app component with routing
├── index.css                   # Global styles
│
├── components/                 # Reusable components
│   ├── Navbar.jsx             # Navigation bar
│   ├── ProblemTable.jsx       # Problem listing table
│   ├── Filters.jsx            # Category & difficulty filters
│   ├── StatsCard.jsx          # Statistics display
│   ├── CircularStatsCard.jsx  # Circular progress indicator
│   ├── ExportImportControls.jsx # Data backup/restore
│   ├── ProtectedRoute.jsx     # Route authentication wrapper
│   └── index.js               # Component exports
│
├── pages/                      # Page components
│   ├── LeetCodeTracker.jsx    # Main tracker page (renamed from LeetCodeTracker)
│   ├── Login.jsx              # Login page
│   ├── SignUp.jsx             # Registration page
│   ├── Patterns.jsx           # Algorithm patterns page
│   ├── InterviewRoadmap.jsx   # Interview prep roadmap
│   └── index.js               # Page exports
│
├── context/                    # React Context
│   ├── AuthContext.jsx        # Authentication state management
│   ├── ThemeContext.js        # Theme (dark/light mode)
│   └── ThemeProvider.jsx      # Theme provider wrapper
│
├── services/                   # API services
│   ├── api.js                 # Axios instance with interceptors
│   ├── authService.js         # Auth API calls (login, register, etc.)
│   └── progressService.js     # Progress API calls
│
├── utils/                      # Utility functions
│   └── validation.js          # Form validation
│
└── data/                       # Static problem datasets (JSON)
    ├── blind75.json           # Blind 75 problems
    ├── neetcode150.json       # NeetCode 150 problems
    ├── interview-roadmap.json # Interview roadmap
    ├── patterns.json          # Algorithm patterns
    ├── algomap100.json        # AlgoMap curriculum
    └── index.js               # Data exports
```

### Key Components

#### **Navbar Component**
- Navigation links
- User profile dropdown
- Logout functionality
- Theme switcher

#### **ProblemTable Component**
- Display problems in table format
- Mark problems as solved
- Track review dates
- Difficulty color coding

#### **Filters Component**
- Filter by category
- Filter by difficulty
- Filter by status (solved, due today, overdue)
- Real-time filtering

#### **StatsCard Component**
- Display statistics (solved, total, percentage)
- Easy/Medium/Hard breakdown

### Authentication Flow

```
1. User visits application
2. AuthContext checks localStorage for JWT token
3. If no token → redirect to Login page
4. User enters credentials → POST /api/auth/login
5. Backend returns JWT token
6. Token stored in localStorage
7. Token included in all subsequent API requests
8. Routes wrapped with ProtectedRoute check token validity
```

### API Service Layer

All API calls are made through service files to maintain separation of concerns:

```javascript
// Example: authService.js
export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

// Example: progressService.js
export const updateLeetcodeProgress = (data) => {
  return api.post('/progress/leetcode', data);
};
```

---

## Backend Architecture

### Directory Structure
```
backend/
├── server.js                   # Express app setup & server start
├── package.json               # Dependencies
├── .env                       # Environment variables
├── .env.example              # Environment template
│
├── src/
│   ├── config/
│   │   └── database.js        # MySQL connection pool
│   │
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   │
│   ├── controllers/
│   │   ├── authController.js  # Auth logic (register, login)
│   │   └── progressController.js # Progress CRUD operations
│   │
│   └── routes/
│       ├── authRoutes.js      # Auth endpoints
│       └── progressRoutes.js  # Progress endpoints
│
└── db/
    ├── schema.sql             # Database schema
    └── init.js                # Database initialization script
```

### Server Configuration (server.js)

```javascript
// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// Error handling
app.use(errorHandler);

// Server start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Database Configuration (database.js)

```javascript
// MySQL connection pool for efficient database access
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

### Authentication Middleware (auth.js)

```javascript
// Verifies JWT token on protected routes
// Sets req.user with decoded user data
// Returns 401 if token invalid/missing
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### LeetCode Progress Table
```sql
CREATE TABLE leetcode_progress (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  list_name VARCHAR(100),
  problem_id INT,
  problem_title VARCHAR(255),
  difficulty VARCHAR(20),
  solved BOOLEAN DEFAULT FALSE,
  solved_date TIMESTAMP,
  
  r1_completed BOOLEAN DEFAULT FALSE,
  r1_due_date DATE,
  r2_completed BOOLEAN DEFAULT FALSE,
  r2_due_date DATE,
  r3_completed BOOLEAN DEFAULT FALSE,
  r3_due_date DATE,
  r4_completed BOOLEAN DEFAULT FALSE,
  r4_due_date DATE,
  r5_completed BOOLEAN DEFAULT FALSE,
  r5_due_date DATE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY unique_user_problem (user_id, problem_id, list_name)
);
```

### Interview Progress Table
```sql
CREATE TABLE interview_progress (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  problem_id INT,
  problem_title VARCHAR(255),
  company VARCHAR(100),
  difficulty VARCHAR(20),
  solved BOOLEAN DEFAULT FALSE,
  attempted_count INT DEFAULT 0,
  last_attempted TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### User Preferences Table
```sql
CREATE TABLE user_preferences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  theme VARCHAR(20) DEFAULT 'light',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY unique_user_preference (user_id)
);
```

---

## REST API Specification

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-domain.com/api`

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Auth Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "full_name": "John Doe"
}

Response: 201 Created
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "user@example.com", "full_name": "John Doe" }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "user@example.com", "full_name": "John Doe" }
}
```

#### Get Current User
```
GET /auth/user
Authorization: Bearer <token>

Response: 200 OK
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Progress Endpoints

#### Get All Progress
```
GET /progress/leetcode
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": 1,
    "problem_id": 1,
    "problem_title": "Two Sum",
    "list_name": "Blind 75",
    "difficulty": "Easy",
    "solved": true,
    "solved_date": "2024-01-15T10:30:00Z",
    "r1_completed": true,
    "r1_due_date": "2024-01-16",
    ...
  }
]
```

#### Get Specific List Progress
```
GET /progress/leetcode/:listName
Authorization: Bearer <token>

Response: 200 OK
[
  { /* problem progress objects */ }
]
```

#### Update Problem Progress
```
POST /progress/leetcode
Authorization: Bearer <token>
Content-Type: application/json

{
  "problem_id": 1,
  "problem_title": "Two Sum",
  "list_name": "Blind 75",
  "difficulty": "Easy",
  "solved": true,
  "r1_completed": true,
  "r2_completed": false
}

Response: 200 OK
{
  "id": 1,
  "success": true,
  "message": "Progress updated successfully"
}
```

#### Delete Problem Progress
```
DELETE /progress/leetcode/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Progress deleted successfully"
}
```

---

## Data Flow Examples

### Marking a Problem as Solved

```
1. User clicks "Mark Solved" in ProblemTable
2. onClick handler calls progressService.updateLeetcodeProgress()
3. Axios POST request to /api/progress/leetcode with problem data
4. Backend authMiddleware verifies JWT token
5. progressController.updateProgress() processes the request
6. Database record created/updated in leetcode_progress table
7. Spaced repetition dates calculated (R1=1 day, R2=3 days, etc.)
8. Response returned to frontend with updated problem data
9. UI updates to show new review dates and status
10. User sees R1, R2, R3, R4, R5 buttons with due dates
```

### Completing a Review

```
1. User clicks "R1" review button when problem due
2. Frontend calls progressService.updateLeetcodeProgress()
3. Sets r1_completed = true in request
4. Backend updates database with completion timestamp
5. Calculates next review date (R2 = 3 days from now)
6. Response shows updated review status
7. Button color changes from yellow to green
8. Progress stats automatically recalculated and displayed
```

---

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=dsa_tracker
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=development
```

---

## Deployment Architecture

### Frontend Deployment (Vercel)
```
GitHub Repository
    ↓
Vercel (detects push)
    ↓
Build: npm run build
    ↓
Deploy to CDN
    ↓
Live at: https://your-app.vercel.app
```

### Backend Deployment (Options)
- **Heroku**: Easy Node.js deployment with free tier
- **Railway**: Modern alternative with better pricing
- **AWS EC2**: Full control and scalability
- **DigitalOcean**: App Platform for managed deployment

### Database (Cloud Options)
- **AWS RDS**: Managed MySQL service
- **Google Cloud SQL**: Fully managed SQL database
- **PlanetScale**: MySQL-compatible serverless database
- **Render**: Integrated database deployment

---

## Security Considerations

### Password Security
- Passwords hashed with bcrypt (salt rounds: 10)
- Never stored as plain text
- Never transmitted in logs or responses

### JWT Tokens
- Generated with HS256 algorithm
- Expiration: 24 hours (configurable)
- Refresh tokens stored in httpOnly cookies (future enhancement)
- Verified on all protected endpoints

### CORS
- Configured to allow frontend origin only
- Prevents unauthorized API access from other domains

### SQL Injection Prevention
- All queries use parameterized statements
- No string concatenation in SQL queries
- Database layer uses prepared statements

### Environment Variables
- Sensitive data never committed to git
- `.env` file in `.gitignore`
- `.env.example` provides template

---

## Performance Optimizations

### Database
- Connection pooling (10 concurrent connections)
- Indexed columns: user_id, problem_id, email
- Efficient query design with proper JOINs

### Frontend
- Code splitting with React Router
- Lazy loading of components
- CSS minification with Tailwind
- Image optimization with CDN delivery

### Caching
- Browser caching for static assets
- API response caching in localStorage (user data)
- JWT tokens stored in localStorage

---

## Error Handling

### Frontend
- Global error boundary for crashes
- API error responses displayed to user
- Validation feedback on forms
- Network error handling with retry logic

### Backend
- Centralized error middleware
- Consistent error response format
- Detailed logging for debugging
- Graceful degradation on database errors

### Error Response Format
```json
{
  "success": false,
  "error": "Authentication failed",
  "message": "Invalid email or password",
  "code": "AUTH_FAILED"
}
```

---

## Monitoring & Logging

### Frontend
- Console errors logged in development
- Error tracking integration ready (Sentry, LogRocket)

### Backend
- Request/response logging
- Error stack traces in development
- Database query timing
- Authentication event logging

---

## Future Architecture Enhancements

1. **Caching Layer**: Redis for session and data caching
2. **Message Queue**: Bull/RabbitMQ for async tasks
3. **Microservices**: Separate auth, progress, and analytics services
4. **GraphQL**: Alternative to REST API
5. **WebSocket**: Real-time progress updates
6. **Mobile Apps**: Native iOS/Android applications
7. **Analytics**: User behavior and learning analytics
8. **Study Groups**: Collaborative features

---

## Development Workflow

```
Feature Development:
1. Create feature branch: git checkout -b feature/name
2. Make changes in frontend/backend
3. Test locally
4. Commit changes: git commit -m "message"
5. Push to remote: git push origin feature/name
6. Create Pull Request for review
7. Merge after approval
8. Deploy to production
```

---

## Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [Spaced Repetition Research](https://en.wikipedia.org/wiki/Spaced_repetition)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

