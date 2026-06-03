import express from 'express';
import {
  getLeetcodeProgress,
  getAllLeetcodeProgress,
  updateLeetcodeProgress,
  getInterviewProgress,
  updateInterviewProgress,
  getPreferences,
  updatePreferences,
} from '../controllers/progressController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// LeetCode Progress routes
router.get('/leetcode', getAllLeetcodeProgress);
router.get('/leetcode/:listName', getLeetcodeProgress);
router.post('/leetcode', updateLeetcodeProgress);

// Interview Progress routes
router.get('/interview', getInterviewProgress);
router.post('/interview', updateInterviewProgress);

// User Preferences routes
router.get('/preferences', getPreferences);
router.post('/preferences', updatePreferences);

export default router;
