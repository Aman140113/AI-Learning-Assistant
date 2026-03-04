const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Certification = require("../models/Certification");
const User = require("../models/User");

// Array of all quiz questions (from dummyData logic or similar)
// We will just fetch from the existing quiz questions data file if needed...
// But instead, we can just use the dummyData file or the Database.
// Wait, in previous implementation, where did questions come from?
// The project has dummyData.ts in frontend, but backend uses models?
// Let's check if there is a Question model. Yes, there is admin/questions so probably Question model exists.
const QuizQuestion = require("../models/QuizQuestion");

function generateLicenceId(domain, level) {
    const year = new Date().getFullYear();
    const random8 = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `SSAI-${domain.toUpperCase()}-${level}-${year}-${random8}`;
}

// GET /api/certification/status/:userId
router.get("/status/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const certs = await Certification.find({ user_id: userId, passed: true });

        const passedLevels = certs.map(c => c.level);

        res.json({
            pl1_passed: passedLevels.includes("PL-1"),
            pl2_passed: passedLevels.includes("PL-2"),
            certifications: certs
        });
    } catch (error) {
        console.error("Error fetching certification status:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/certification/questions?domainId=...
router.get("/questions", async (req, res) => {
    try {
        const { domainId } = req.query;

        // Import Skill model here to avoid circular dependency if any, or just ensure it's available
        const Skill = require("../models/Skill");

        // Find all skills for this domain
        let skillIds = [];
        if (mongoose.Types.ObjectId.isValid(domainId)) {
            const skills = await Skill.find({ domain_id: domainId }).select("_id");
            skillIds = skills.map(s => s._id);
        }

        // Fetch questions for these skills
        let questions = [];
        if (skillIds.length > 0) {
            questions = await QuizQuestion.aggregate([
                { $match: { skill_id: { $in: skillIds } } },
                { $sample: { size: 15 } }
            ]);
        }

        // If not enough questions in DB for this domain, fallback to taking any 15 questions
        let finalQuestions = questions;
        if (finalQuestions.length < 15) {
            const fallback = await QuizQuestion.aggregate([{ $sample: { size: 15 } }]);
            finalQuestions = fallback;
        }

        // Remove correct_answer before sending to client
        const safeQuestions = finalQuestions.map(q => ({
            id: q._id,
            question_text: q.question_text,
            options: q.options,
            difficulty: q.difficulty_level
        }));

        res.json(safeQuestions);
    } catch (error) {
        console.error("Error fetching certification questions:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/certification/submit
router.post("/submit", async (req, res) => {
    try {
        const { userId, domainId, level, answers } = req.body;
        // answers: [{ questionId, selectedAnswer }]

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        let correctCount = 0;
        const total = answers.length || 15;

        for (const ans of answers) {
            const q = await QuizQuestion.findById(ans.questionId);
            if (q && q.correct_answer === ans.selectedAnswer) {
                correctCount++;
            }
        }

        const scorePercent = Math.round((correctCount / total) * 100);
        const passed = scorePercent >= 70; // 70% passing criteria

        let licence_id = null;
        if (passed) {
            licence_id = generateLicenceId(domainId, level);
            // Ensure uniqueness
            let collision = await Certification.findOne({ licence_id });
            while (collision) {
                licence_id = generateLicenceId(domainId, level);
                collision = await Certification.findOne({ licence_id });
            }
        }

        const cert = await Certification.create({
            user_id: userId,
            domain_id: domainId,
            level,
            score: scorePercent,
            passed,
            licence_id
        });

        res.json({
            passed,
            score: scorePercent,
            correctCount,
            total,
            licence_id: cert.licence_id
        });
    } catch (error) {
        console.error("Error submitting certification:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
