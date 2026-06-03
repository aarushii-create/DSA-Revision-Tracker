import { query } from '../config/database.js';

// --- LeetCode Progress ---

export const getLeetcodeProgress = async (req, res) => {
  const { listName } = req.params;

  try {
    const results = await query(
      `SELECT 
        problem_id, solved, solved_date,
        review_1_completed, review_1_due, review_1_date,
        review_2_completed, review_2_due, review_2_date,
        review_3_completed, review_3_due, review_3_date,
        review_4_completed, review_4_due, review_4_date,
        review_5_completed, review_5_due, review_5_date,
        difficulty, category
      FROM leetcode_progress 
      WHERE user_id = ? AND list_name = ?`,
      [req.userId, listName]
    );

    // Transform to match frontend format
    const progress = {};
    results.forEach((row) => {
      progress[row.problem_id] = {
        solved: row.solved,
        solvedDate: row.solved_date,
        reviews: [
          row.review_1_completed,
          row.review_2_completed,
          row.review_3_completed,
          row.review_4_completed,
          row.review_5_completed,
        ],
        dates: {
          review1: row.review_1_date,
          review2: row.review_2_date,
          review3: row.review_3_date,
          review4: row.review_4_date,
          review5: row.review_5_date,
        },
      };
    });

    res.json(progress);
  } catch (error) {
    console.error('Get leetcode progress error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

export const getAllLeetcodeProgress = async (req, res) => {
  try {
    const results = await query(
      `SELECT 
        list_name, problem_id, solved, solved_date,
        review_1_completed, review_1_due, review_1_date,
        review_2_completed, review_2_due, review_2_date,
        review_3_completed, review_3_due, review_3_date,
        review_4_completed, review_4_due, review_4_date,
        review_5_completed, review_5_due, review_5_date
      FROM leetcode_progress 
      WHERE user_id = ?`,
      [req.userId]
    );

    const progress = {
      'Blind 75': {},
      'AlgoMap 100 Questions': {},
      'NeetCode 150': {},
    };

    results.forEach((row) => {
      if (!progress[row.list_name]) {
        progress[row.list_name] = {};
      }

      progress[row.list_name][row.problem_id] = {
        solved: row.solved,
        solvedDate: row.solved_date,
        reviews: [
          row.review_1_completed,
          row.review_2_completed,
          row.review_3_completed,
          row.review_4_completed,
          row.review_5_completed,
        ],
        dates: {
          review1: row.review_1_date,
          review2: row.review_2_date,
          review3: row.review_3_date,
          review4: row.review_4_date,
          review5: row.review_5_date,
        },
      };
    });

    res.json(progress);
  } catch (error) {
    console.error('Get all leetcode progress error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

export const updateLeetcodeProgress = async (req, res) => {
  const { listName, problemId, updateData } = req.body;

  if (!listName || !problemId) {
    return res.status(400).json({ error: 'listName and problemId are required' });
  }

  try {
    // Check if record exists
    const existing = await query(
      'SELECT id FROM leetcode_progress WHERE user_id = ? AND problem_id = ? AND list_name = ?',
      [req.userId, problemId, listName]
    );

    let result;

    if (existing.length > 0) {
      // Update existing record
      const updateFields = [];
      const updateValues = [];

      if (updateData.solved !== undefined) {
        updateFields.push('solved = ?');
        updateValues.push(updateData.solved);
      }
      if (updateData.solvedDate !== undefined) {
        updateFields.push('solved_date = ?');
        updateValues.push(updateData.solvedDate);
      }

      // Handle reviews (1-5)
      for (let i = 1; i <= 5; i++) {
        if (updateData.reviews?.[i - 1] !== undefined) {
          updateFields.push(`review_${i}_completed = ?`);
          updateValues.push(updateData.reviews[i - 1]);
        }
        if (updateData.dates?.[`review${i}`] !== undefined) {
          updateFields.push(`review_${i}_date = ?`);
          updateValues.push(updateData.dates[`review${i}`]);
        }
        if (updateData.dueDate?.[`review${i}`] !== undefined) {
          updateFields.push(`review_${i}_due = ?`);
          updateValues.push(updateData.dueDate[`review${i}`]);
        }
      }

      updateValues.push(req.userId, problemId, listName);

      result = await query(
        `UPDATE leetcode_progress SET ${updateFields.join(', ')} WHERE user_id = ? AND problem_id = ? AND list_name = ?`,
        updateValues
      );
    } else {
      // Create new record
      result = await query(
        `INSERT INTO leetcode_progress (user_id, problem_id, list_name, solved, solved_date)
         VALUES (?, ?, ?, ?, ?)`,
        [req.userId, problemId, listName, updateData.solved || false, updateData.solvedDate || null]
      );
    }

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Update leetcode progress error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

// --- Interview Progress ---

export const getInterviewProgress = async (req, res) => {
  try {
    const results = await query(
      'SELECT item_id, completed FROM interview_progress WHERE user_id = ?',
      [req.userId]
    );

    const progress = {};
    results.forEach((row) => {
      progress[row.item_id] = row.completed;
    });

    res.json(progress);
  } catch (error) {
    console.error('Get interview progress error:', error);
    res.status(500).json({ error: 'Failed to fetch interview progress' });
  }
};

export const updateInterviewProgress = async (req, res) => {
  const { itemId, completed } = req.body;

  if (!itemId || completed === undefined) {
    return res.status(400).json({ error: 'itemId and completed are required' });
  }

  try {
    // Check if record exists
    const existing = await query(
      'SELECT id FROM interview_progress WHERE user_id = ? AND item_id = ?',
      [req.userId, itemId]
    );

    if (existing.length > 0) {
      await query(
        'UPDATE interview_progress SET completed = ?, completed_date = ? WHERE user_id = ? AND item_id = ?',
        [completed, completed ? new Date().toISOString().split('T')[0] : null, req.userId, itemId]
      );
    } else {
      await query(
        'INSERT INTO interview_progress (user_id, item_id, completed, completed_date) VALUES (?, ?, ?, ?)',
        [req.userId, itemId, completed, completed ? new Date().toISOString().split('T')[0] : null]
      );
    }

    res.json({ message: 'Interview progress updated successfully' });
  } catch (error) {
    console.error('Update interview progress error:', error);
    res.status(500).json({ error: 'Failed to update interview progress' });
  }
};

// --- User Preferences ---

export const getPreferences = async (req, res) => {
  try {
    const results = await query(
      'SELECT theme FROM user_preferences WHERE user_id = ?',
      [req.userId]
    );

    const preferences = results.length > 0 ? results[0] : { theme: 'light' };
    res.json(preferences);
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
};

export const updatePreferences = async (req, res) => {
  const { theme } = req.body;

  if (!theme || !['light', 'dark'].includes(theme)) {
    return res.status(400).json({ error: 'Invalid theme' });
  }

  try {
    const existing = await query(
      'SELECT id FROM user_preferences WHERE user_id = ?',
      [req.userId]
    );

    if (existing.length > 0) {
      await query(
        'UPDATE user_preferences SET theme = ? WHERE user_id = ?',
        [theme, req.userId]
      );
    } else {
      await query(
        'INSERT INTO user_preferences (user_id, theme) VALUES (?, ?)',
        [req.userId, theme]
      );
    }

    res.json({ message: 'Preferences updated successfully', theme });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
};
