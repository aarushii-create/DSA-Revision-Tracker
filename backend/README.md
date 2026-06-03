# Backend Setup Guide

## Prerequisites

- Node.js 16+ and npm
- MySQL 5.7+

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure `.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=leetcode_tracker
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

## Database Setup

### Option 1: Using the initialization script (Recommended)

```bash
npm run db:init
```

This will:
- Create the `leetcode_tracker` database
- Create all required tables
- Set up proper indexes

### Option 2: Manual setup

1. Open MySQL:
```bash
mysql -u root -p
```

2. Run the schema file:
```sql
source db/schema.sql;
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Progress (all require authentication)
- `GET /api/progress/leetcode` - Get all LeetCode progress
- `GET /api/progress/leetcode/:listName` - Get progress for specific list
- `POST /api/progress/leetcode` - Update LeetCode progress
- `GET /api/progress/interview` - Get interview progress
- `POST /api/progress/interview` - Update interview progress
- `GET /api/progress/preferences` - Get user preferences
- `POST /api/progress/preferences` - Update user preferences

## API Usage Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "username": "john_doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get User Info (with token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update LeetCode Progress
```bash
curl -X POST http://localhost:5000/api/progress/leetcode \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "listName": "Blind 75",
    "problemId": "two-sum",
    "updateData": {
      "solved": true,
      "solvedDate": "2024-05-26"
    }
  }'
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── progressController.js # Progress/preferences logic
│   ├── middleware/
│   │   └── auth.js              # JWT middleware
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── progressRoutes.js    # Progress endpoints
│   └── server.js                # Main server file
├── db/
│   ├── schema.sql               # Database schema
│   └── init.js                  # Database initialization script
├── package.json
├── .env.example
└── .gitignore
```

## Troubleshooting

### Connection refused error
- Make sure MySQL is running
- Check DB_HOST, DB_USER, and DB_PASSWORD in .env

### Authentication errors
- Make sure JWT_SECRET is set in .env
- Check that Authorization header includes "Bearer " prefix

### Database errors
- Run `npm run db:init` again
- Check MySQL user permissions

## Next Steps

After backend is running:
1. Update the frontend to use these API endpoints
2. Remove localStorage dependencies
3. Add login/signup pages to frontend
4. Test all features with the database
