const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const DailyTask = require("../models/DailyTask");

// Helper — get today's date as "YYYY-MM-DD"
const getToday = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
};

// Default daily tasks that get generated each day
const DEFAULT_TASKS = [
    { title: "📖 Read a concept for 10 minutes", xp_reward: 15 },
    { title: "🧠 Take a quick quiz", xp_reward: 25 },
    { title: "📝 Review yesterday's weak skills", xp_reward: 20 },
    { title: "💡 Learn one new keyword/term", xp_reward: 10 },
    { title: "🔄 Revise a completed topic", xp_reward: 15 },
];

// GET /api/daily-tasks/:userId — Get today's tasks (auto-generate if none exist)
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const today = getToday();

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        let tasks = await DailyTask.find({ user_id: userId, date: today });

        // Auto-generate today's tasks if none exist
        if (tasks.length === 0) {
            const newTasks = DEFAULT_TASKS.map((t) => ({
                user_id: userId,
                title: t.title,
                xp_reward: t.xp_reward,
                date: today,
            }));
            tasks = await DailyTask.insertMany(newTasks);
        }

        // Get completed dates for calendar (last 60 days)
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
        const dateStr = sixtyDaysAgo.toISOString().split("T")[0];

        const completedDates = await DailyTask.aggregate([
            {
                $match: {
                    user_id: tasks[0]?.user_id || require("mongoose").Types.ObjectId.createFromHexString(userId),
                    date: { $gte: dateStr },
                    completed: true,
                },
            },
            {
                $group: {
                    _id: "$date",
                    completedCount: { $sum: 1 },
                    totalXp: { $sum: "$xp_reward" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.json({
            tasks,
            completedDates,
            today,
        });
    } catch (error) {
        console.error("Get daily tasks error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/daily-tasks/:taskId/complete — Mark a task as done
router.post("/:taskId/complete", async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await DailyTask.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        if (task.completed) {
            return res.json({ message: "Already completed", task, xpAwarded: 0 });
        }

        task.completed = true;
        task.completed_at = new Date();
        await task.save();

        res.json({
            message: "Task completed! XP awarded.",
            task,
            xpAwarded: task.xp_reward,
        });
    } catch (error) {
        console.error("Complete task error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
