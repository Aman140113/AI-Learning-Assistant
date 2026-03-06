const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const UserSkillProgress = require("../models/UserSkillProgress");
const QuizAttempt = require("../models/QuizAttempt");
const LearningPathItem = require("../models/LearningPathItem");
const UserDomain = require("../models/UserDomain");

// GET /api/progress/:userId — Get user dashboard data
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        // Get skill progress
        const skillProgress = await UserSkillProgress.find({ user_id: userId })
            .populate("skill_id", "name difficulty_level");

        // Get quiz attempts
        const attempts = await QuizAttempt.find({ user_id: userId })
            .populate("domain_id", "name")
            .sort({ taken_at: -1 });

        // Get selected domains
        const selectedDomains = await UserDomain.find({ user_id: userId })
            .populate("domain_id");

        // Get completed daily tasks XP
        const DailyTask = require("../models/DailyTask");
        const completedTasks = await DailyTask.find({ user_id: userId, completed: true });
        const taskXp = completedTasks.reduce((sum, t) => sum + (t.xp_reward || 0), 0);

        // Calculate XP (10 per attempt + score bonus + daily task XP)
        const totalXp = attempts.reduce((sum, a) => sum + 10 + Math.round(a.score / 10), 0) + taskXp;

        // Determine level
        let level = "Beginner";
        if (totalXp >= 500) level = "Advanced";
        else if (totalXp >= 200) level = "Intermediate";

        // Get weak skills
        const weakSkills = skillProgress
            .filter((sp) => sp.is_weak)
            .map((sp) => sp.skill_id?.name || "Unknown");

        // Format skills for frontend
        const skills = skillProgress.map((sp) => ({
            name: sp.skill_id?.name || "Unknown",
            progress: sp.progress_percent,
            status: sp.progress_percent >= 80 ? "Proficient" : sp.progress_percent >= 40 ? "Intermediate" : "Beginner",
        }));

        res.json({
            xp: totalXp,
            maxXp: 1000,
            level,
            streak: attempts.length,
            selectedDomain: selectedDomains[0]?.domain_id?.name || "None",
            skills,
            weakSkills,
            recentAttempts: attempts.slice(0, 5),
        });
    } catch (error) {
        console.error("Get progress error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/progress/:userId/learning-path
router.get("/:userId/learning-path", async (req, res) => {
    try {
        const items = await LearningPathItem.find({ user_id: req.params.userId })
            .sort({ week_number: 1 });
        res.json(items);
    } catch (error) {
        console.error("Get learning path error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
