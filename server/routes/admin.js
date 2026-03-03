const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Domain = require("../models/Domain");
const Skill = require("../models/Skill");
const QuizQuestion = require("../models/QuizQuestion");
const QuizAttempt = require("../models/QuizAttempt");
const QuizAnswer = require("../models/QuizAnswer");
const UserDomain = require("../models/UserDomain");
const UserSkillProgress = require("../models/UserSkillProgress");
const DailyTask = require("../models/DailyTask");
const LearningPathItem = require("../models/LearningPathItem");

// ── Admin Auth Middleware ──
const ADMIN_EMAIL = "admin@email.com";
const ADMIN_PASSWORD = "admin123";

function adminAuth(req, res, next) {
    const authHeader = req.headers["x-admin-token"];
    if (authHeader !== `${ADMIN_EMAIL}:${ADMIN_PASSWORD}`) {
        return res.status(401).json({ error: "Unauthorized — Admin access required" });
    }
    next();
}

// Apply middleware to all routes
router.use(adminAuth);

// ══════════════════════════════════════
//  POST /api/admin/login — Verify admin credentials
// ══════════════════════════════════════
router.post("/login", (req, res) => {
    // If we reach here, adminAuth already passed
    res.json({ message: "Admin login successful", admin: true });
});

// ══════════════════════════════════════
//  GET /api/admin/stats — Dashboard overview
// ══════════════════════════════════════
router.get("/stats", async (req, res) => {
    try {
        const [
            totalUsers,
            totalAttempts,
            totalQuestions,
            totalDomains,
            totalSkills,
        ] = await Promise.all([
            User.countDocuments(),
            QuizAttempt.countDocuments(),
            QuizQuestion.countDocuments(),
            Domain.countDocuments(),
            Skill.countDocuments(),
        ]);

        // Domain distribution (how many users per domain)
        const domainDistribution = await UserDomain.aggregate([
            {
                $group: {
                    _id: "$domain_id",
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "domains",
                    localField: "_id",
                    foreignField: "_id",
                    as: "domain",
                },
            },
            { $unwind: "$domain" },
            {
                $project: {
                    name: "$domain.name",
                    count: 1,
                },
            },
            { $sort: { count: -1 } },
        ]);

        // Average scores per domain
        const avgScores = await QuizAttempt.aggregate([
            {
                $group: {
                    _id: "$domain_id",
                    avgScore: { $avg: "$score" },
                    totalAttempts: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "domains",
                    localField: "_id",
                    foreignField: "_id",
                    as: "domain",
                },
            },
            { $unwind: "$domain" },
            {
                $project: {
                    name: "$domain.name",
                    avgScore: { $round: ["$avgScore", 1] },
                    totalAttempts: 1,
                },
            },
            { $sort: { avgScore: -1 } },
        ]);

        // Recent signups (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const recentSignups = await User.countDocuments({ created_at: { $gte: weekAgo } });

        res.json({
            totalUsers,
            totalAttempts,
            totalQuestions,
            totalDomains,
            totalSkills,
            recentSignups,
            domainDistribution,
            avgScores,
        });
    } catch (error) {
        console.error("Admin stats error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ══════════════════════════════════════
//  USER MANAGEMENT
// ══════════════════════════════════════

// GET /api/admin/users — List all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password_hash").sort({ created_at: -1 });

        // For each user, get their domain and latest attempt
        const enrichedUsers = await Promise.all(
            users.map(async (user) => {
                const userDomain = await UserDomain.findOne({ user_id: user._id })
                    .populate("domain_id", "name")
                    .sort({ selected_at: -1 });

                const latestAttempt = await QuizAttempt.findOne({ user_id: user._id })
                    .sort({ taken_at: -1 });

                const attemptCount = await QuizAttempt.countDocuments({ user_id: user._id });

                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    created_at: user.created_at,
                    domain: userDomain?.domain_id?.name || "Not selected",
                    latestScore: latestAttempt?.score ?? null,
                    level: latestAttempt?.level_assigned ?? "N/A",
                    attemptCount,
                };
            })
        );

        res.json(enrichedUsers);
    } catch (error) {
        console.error("Admin get users error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE /api/admin/users/:id — Delete user and all related data
router.delete("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        await Promise.all([
            QuizAttempt.deleteMany({ user_id: userId }),
            QuizAnswer.deleteMany({ user_id: userId }),
            UserSkillProgress.deleteMany({ user_id: userId }),
            UserDomain.deleteMany({ user_id: userId }),
            LearningPathItem.deleteMany({ user_id: userId }),
            DailyTask.deleteMany({ user_id: userId }),
        ]);

        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Admin delete user error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ══════════════════════════════════════
//  DOMAIN MANAGEMENT
// ══════════════════════════════════════

// GET /api/admin/domains — List all domains with skill counts
router.get("/domains", async (req, res) => {
    try {
        const domains = await Domain.find();
        const enriched = await Promise.all(
            domains.map(async (d) => {
                const skillCount = await Skill.countDocuments({ domain_id: d._id });
                const questionCount = await QuizQuestion.countDocuments({
                    skill_id: { $in: (await Skill.find({ domain_id: d._id })).map((s) => s._id) },
                });
                return {
                    ...d.toObject(),
                    skillCount,
                    questionCount,
                };
            })
        );
        res.json(enriched);
    } catch (error) {
        console.error("Admin get domains error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/admin/domains — Create a new domain
router.post("/domains", async (req, res) => {
    try {
        const { name, description, icon } = req.body;
        if (!name) return res.status(400).json({ error: "Domain name is required" });

        const domain = await Domain.create({ name, description, icon });
        res.status(201).json(domain);
    } catch (error) {
        console.error("Admin create domain error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// PUT /api/admin/domains/:id — Update a domain
router.put("/domains/:id", async (req, res) => {
    try {
        const { name, description, icon } = req.body;
        const domain = await Domain.findByIdAndUpdate(
            req.params.id,
            { name, description, icon },
            { new: true }
        );
        if (!domain) return res.status(404).json({ error: "Domain not found" });
        res.json(domain);
    } catch (error) {
        console.error("Admin update domain error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE /api/admin/domains/:id — Delete a domain
router.delete("/domains/:id", async (req, res) => {
    try {
        const domainId = req.params.id;
        // Delete all related skills and questions
        const skills = await Skill.find({ domain_id: domainId });
        const skillIds = skills.map((s) => s._id);

        await QuizQuestion.deleteMany({ skill_id: { $in: skillIds } });
        await Skill.deleteMany({ domain_id: domainId });
        await UserDomain.deleteMany({ domain_id: domainId });

        const domain = await Domain.findByIdAndDelete(domainId);
        if (!domain) return res.status(404).json({ error: "Domain not found" });

        res.json({ message: "Domain and related data deleted" });
    } catch (error) {
        console.error("Admin delete domain error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ══════════════════════════════════════
//  SKILL MANAGEMENT
// ══════════════════════════════════════

// GET /api/admin/skills — List all skills grouped by domain
router.get("/skills", async (req, res) => {
    try {
        const { domainId } = req.query;
        const filter = domainId ? { domain_id: domainId } : {};
        const skills = await Skill.find(filter).populate("domain_id", "name");

        const enriched = await Promise.all(
            skills.map(async (s) => {
                const questionCount = await QuizQuestion.countDocuments({ skill_id: s._id });
                return { ...s.toObject(), questionCount };
            })
        );

        res.json(enriched);
    } catch (error) {
        console.error("Admin get skills error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/admin/skills — Create a new skill
router.post("/skills", async (req, res) => {
    try {
        const { domain_id, name, description, difficulty_level } = req.body;
        if (!domain_id || !name) return res.status(400).json({ error: "domain_id and name are required" });

        const skill = await Skill.create({ domain_id, name, description, difficulty_level });
        res.status(201).json(skill);
    } catch (error) {
        console.error("Admin create skill error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// PUT /api/admin/skills/:id — Update a skill
router.put("/skills/:id", async (req, res) => {
    try {
        const { name, description, difficulty_level } = req.body;
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            { name, description, difficulty_level },
            { new: true }
        );
        if (!skill) return res.status(404).json({ error: "Skill not found" });
        res.json(skill);
    } catch (error) {
        console.error("Admin update skill error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE /api/admin/skills/:id — Delete a skill
router.delete("/skills/:id", async (req, res) => {
    try {
        await QuizQuestion.deleteMany({ skill_id: req.params.id });
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) return res.status(404).json({ error: "Skill not found" });
        res.json({ message: "Skill and related questions deleted" });
    } catch (error) {
        console.error("Admin delete skill error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ══════════════════════════════════════
//  QUIZ QUESTION MANAGEMENT
// ══════════════════════════════════════

// GET /api/admin/questions — List questions with filters
router.get("/questions", async (req, res) => {
    try {
        const { skillId, domainId, difficulty } = req.query;
        let filter = {};

        if (skillId) {
            filter.skill_id = skillId;
        } else if (domainId) {
            const skillFilter = { domain_id: domainId };
            if (difficulty) skillFilter.difficulty_level = difficulty;
            const skills = await Skill.find(skillFilter);
            filter.skill_id = { $in: skills.map((s) => s._id) };
        } else if (difficulty) {
            const skills = await Skill.find({ difficulty_level: difficulty });
            filter.skill_id = { $in: skills.map((s) => s._id) };
        }

        const questions = await QuizQuestion.find(filter)
            .populate({
                path: "skill_id",
                select: "name difficulty_level domain_id",
                populate: { path: "domain_id", select: "name" },
            });

        res.json(questions);
    } catch (error) {
        console.error("Admin get questions error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/admin/questions — Create a question
router.post("/questions", async (req, res) => {
    try {
        const { skill_id, question_text, options, correct_answer, explanation } = req.body;
        if (!skill_id || !question_text || !options || correct_answer === undefined) {
            return res.status(400).json({ error: "skill_id, question_text, options, and correct_answer are required" });
        }

        const question = await QuizQuestion.create({
            skill_id,
            question_text,
            options,
            correct_answer,
            explanation: explanation || "",
        });
        res.status(201).json(question);
    } catch (error) {
        console.error("Admin create question error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// PUT /api/admin/questions/:id — Update a question
router.put("/questions/:id", async (req, res) => {
    try {
        const { question_text, options, correct_answer, explanation } = req.body;
        const question = await QuizQuestion.findByIdAndUpdate(
            req.params.id,
            { question_text, options, correct_answer, explanation },
            { new: true }
        );
        if (!question) return res.status(404).json({ error: "Question not found" });
        res.json(question);
    } catch (error) {
        console.error("Admin update question error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE /api/admin/questions/:id — Delete a question
router.delete("/questions/:id", async (req, res) => {
    try {
        const question = await QuizQuestion.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ error: "Question not found" });
        res.json({ message: "Question deleted" });
    } catch (error) {
        console.error("Admin delete question error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ══════════════════════════════════════
//  USER LEARNING PATH
// ══════════════════════════════════════

// GET /api/admin/users/:id/learning-path — Get a user's learning path
router.get("/users/:id/learning-path", async (req, res) => {
    try {
        const userId = req.params.id;

        // Get the user's domain
        const userDomain = await UserDomain.findOne({ user_id: userId })
            .populate("domain_id", "name")
            .sort({ selected_at: -1 });

        if (!userDomain || !userDomain.domain_id) {
            return res.json({ domain: "Not selected", path: [] });
        }

        // Get skills for this domain ordered by difficulty
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        const skills = await Skill.find({ domain_id: userDomain.domain_id._id })
            .sort({ difficulty_level: 1 });

        // Sort by difficulty order
        skills.sort((a, b) => (difficultyOrder[a.difficulty_level] || 0) - (difficultyOrder[b.difficulty_level] || 0));

        // Get question counts per skill
        const path = await Promise.all(
            skills.map(async (skill, index) => {
                const questionCount = await QuizQuestion.countDocuments({ skill_id: skill._id });
                return {
                    _id: skill._id,
                    week: index + 1,
                    name: skill.name,
                    description: skill.description || "",
                    difficulty: skill.difficulty_level,
                    questionCount,
                };
            })
        );

        res.json({
            domain: userDomain.domain_id.name,
            path,
        });
    } catch (error) {
        console.error("Admin get learning path error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
