import { useState, useEffect } from "react";
import { Info, ExternalLink, Map } from "lucide-react";
import {
  Filters,
  StatsCard,
  ProblemTable,
  ExportImportControls,
  CircularStatsCard,
} from "../components";
import { blind75, algomap100, neetcode150 } from "../data";
import { progressService } from "../services/progressService";

const problemLists = {
  "Blind 75": blind75,
  "AlgoMap 100 Questions": algomap100,
  "NeetCode 150": neetcode150,
};

// Roadmap URLs for each list
const roadmapLinks = {
  "Blind 75": "https://leetcode.com/problem-list/oizxjoit/",
  "AlgoMap 100 Questions": "http://algomap.io/roadmap",
  "NeetCode 150": "https://neetcode.io/roadmap",
};


// --- Spaced repetition intervals ---
const intervals = [1, 3, 7, 14, 30];

const DSARevisionTracker = () => {
  // --- State with API ---
  const [progress, setProgress] = useState({
    "Blind 75": {},
    "AlgoMap 100 Questions": {},
    "NeetCode 150": {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [showOnlyDueToday, setShowOnlyDueToday] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedList, setSelectedList] = useState("");

  // Load progress from API on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        setIsLoading(true);
        const data = await progressService.getAllLeetcodeProgress();
        setProgress(data);
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, []);

  // --- Helpers ---
  const today = new Date().toISOString().split("T")[0];

  const calculateNextReviews = (solvedDate) => {
    if (!solvedDate) return [];
    const date = new Date(solvedDate);
    return intervals.map(
      (days) =>
        new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
    );
  };

  const toggleComplete = async (problemId, reviewIndex = null) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const listProgress = progress[selectedList] || {};
    const current = listProgress[problemId] || {
      solved: false,
      reviews: Array(5).fill(false),
      dates: {},
    };

    let updateData = {};

    if (reviewIndex === null) {
      const newSolved = !current.solved;
      updateData = {
        solved: newSolved,
        solvedDate: newSolved ? todayStr : null,
      };
    } else {
      const newReviews = [...current.reviews];
      newReviews[reviewIndex] = !newReviews[reviewIndex];
      updateData = {
        reviews: newReviews,
        dates: {},
      };
      if (newReviews[reviewIndex]) {
        updateData.dates[`review${reviewIndex + 1}`] = todayStr;
      }
    }

    // Update local state immediately for responsiveness
    setProgress((prev) => {
      const newProgress = { ...prev };
      if (reviewIndex === null) {
        const newSolved = !current.solved;
        newProgress[selectedList] = {
          ...listProgress,
          [problemId]: {
            ...current,
            solved: newSolved,
            solvedDate: newSolved ? todayStr : null,
            reviews: newSolved ? current.reviews : Array(5).fill(false),
            dates: newSolved ? { ...current.dates, initial: todayStr } : {},
          },
        };
      } else {
        const newReviews = [...current.reviews];
        newReviews[reviewIndex] = !newReviews[reviewIndex];
        const newDates = { ...current.dates };
        if (newReviews[reviewIndex]) {
          newDates[`review${reviewIndex + 1}`] = todayStr;
        } else {
          delete newDates[`review${reviewIndex + 1}`];
        }
        newProgress[selectedList] = {
          ...listProgress,
          [problemId]: { ...current, reviews: newReviews, dates: newDates },
        };
      }
      return newProgress;
    });

    // Save to API
    try {
      setIsSaving(true);
      await progressService.updateLeetcodeProgress(
        selectedList,
        problemId,
        updateData
      );
    } catch (error) {
      console.error("Error saving progress:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const problems = problemLists[selectedList] || [];
  const currentProgress = progress[selectedList] || {};

  const categories = [
    "All",
    ...Array.from(new Set(problems.flatMap((p) => p.topics || []))),
  ];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

   const stats = {
     total: problems.length,
     solved: problems.filter((p) => currentProgress[p.id]?.solved).length,
     easy: problems.filter(
       (p) => p.difficulty === "Easy" && currentProgress[p.id]?.solved
     ).length,
     medium: problems.filter(
       (p) => p.difficulty === "Medium" && currentProgress[p.id]?.solved
     ).length,
     hard: problems.filter(
       (p) => p.difficulty === "Hard" && currentProgress[p.id]?.solved
     ).length,
   };

  const getDueProblems = () => {
    return problems.filter((problem) => {
      const prob = currentProgress[problem.id];
      if (!prob || !prob.solved) return false;
      const nextReviews = calculateNextReviews(prob.solvedDate);
      return nextReviews.some(
        (date, idx) => !prob.reviews?.[idx] && date <= today
      );
    }).length;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        {isSaving && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
            Saving...
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                DSA Revision Tracker - {selectedList}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your progress with spaced repetition
              </p>
            </div>
            <div className="flex sm:flex-row gap-2 items-start sm:items-center">
              {/* Dropdown for problem list */}
              <select
                id="problem-list"
                value={selectedList}
                title="Select a problem list"
                onChange={(e) => setSelectedList(e.target.value)}
                className="px-4 py-2 cursor-pointer rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
              >
                <option value="" disabled>
                  Select List
                </option>
                {Object.keys(problemLists).map((listName) => (
                  <option key={listName} value={listName}>
                    {listName}
                  </option>
                ))}
              </select>

              {/* Official Roadmap */}
              <a
                href={roadmapLinks[selectedList]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors"
                title="View the official NeetCode roadmap"
              >
                <Map size={16} /> Roadmap <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Toggle Explanation */}
          <div className="mt-4">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors"
            >
              <Info size={16} />
              {showExplanation ? "Hide" : "Show"} Spaced Repetition Info
            </button>
          </div>
        </div>

        {/* Explanation Section */}
        {showExplanation && (
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6 transition-colors">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">
              How Spaced Repetition Works
            </h3>
            <div className="text-blue-700 dark:text-blue-200 space-y-2">
              <p>
                This tracker uses spaced repetition to help you retain coding
                problems long-term.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Review Schedule:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <strong>R1:</strong> Review after 1 day
                    </li>
                    <li>
                      <strong>R2:</strong> Review after 3 days
                    </li>
                    <li>
                      <strong>R3:</strong> Review after 7 days (1 week)
                    </li>
                    <li>
                      <strong>R4:</strong> Review after 14 days (2 weeks)
                    </li>
                    <li>
                      <strong>R5:</strong> Review after 30 days (1 month)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How to Use:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>1. Mark a problem as solved when you complete it</li>
                    <li>2. Review buttons (R1-R5) will show required dates</li>
                    <li>
                      3. Click review buttons when you successfully review
                    </li>
                    <li>4. Use "Due Today" filter to see what needs review</li>
                    <li>5. Check the Official Roadmap for study guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <CircularStatsCard
          stats={{
            total: stats.total,
            solved: stats.solved,
            easy: stats.easy,
            medium: stats.medium,
            hard: stats.hard,
            dueToday: getDueProblems(),
          }}
          problems={problems}
        />

        {/* Export / Import / Clear */}
        <ExportImportControls progress={progress} setProgress={setProgress} />

        {/* Filters */}
        <Filters
          categories={categories}
          difficulties={difficulties}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterDifficulty={filterDifficulty}
          setFilterDifficulty={setFilterDifficulty}
          showOnlyDueToday={showOnlyDueToday}
          setShowOnlyDueToday={setShowOnlyDueToday}
        />

        {/* Problems Table */}
        <ProblemTable
          problems={problems}
          progress={currentProgress}
          toggleComplete={toggleComplete}
          calculateNextReviews={calculateNextReviews}
          filterCategory={filterCategory}
          filterDifficulty={filterDifficulty}
          showOnlyDueToday={showOnlyDueToday}
        />
      </div>
    </div>
  );
};

export default DSARevisionTracker;
