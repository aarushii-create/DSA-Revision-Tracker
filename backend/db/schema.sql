-- Create database
CREATE DATABASE IF NOT EXISTS leetcode_tracker;
USE leetcode_tracker;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- LeetCode Progress table
CREATE TABLE IF NOT EXISTS leetcode_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  problem_id VARCHAR(100) NOT NULL,
  list_name VARCHAR(50) NOT NULL, -- "Blind 75", "LeetCode 75", "NeetCode 150"
  solved BOOLEAN DEFAULT FALSE,
  solved_date DATE,
  review_1_completed BOOLEAN DEFAULT FALSE,
  review_1_due DATE,
  review_1_date DATE,
  review_2_completed BOOLEAN DEFAULT FALSE,
  review_2_due DATE,
  review_2_date DATE,
  review_3_completed BOOLEAN DEFAULT FALSE,
  review_3_due DATE,
  review_3_date DATE,
  review_4_completed BOOLEAN DEFAULT FALSE,
  review_4_due DATE,
  review_4_date DATE,
  review_5_completed BOOLEAN DEFAULT FALSE,
  review_5_due DATE,
  review_5_date DATE,
  difficulty VARCHAR(20),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_problem (user_id, problem_id, list_name),
  INDEX idx_user_id (user_id),
  INDEX idx_solved (user_id, solved),
  INDEX idx_list_name (user_id, list_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Interview Roadmap Progress table
CREATE TABLE IF NOT EXISTS interview_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  item_id VARCHAR(100) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_item (user_id, item_id),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  theme VARCHAR(20) DEFAULT 'light', -- "light" or "dark"
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Refresh Tokens table (for logout functionality)
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(500) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
