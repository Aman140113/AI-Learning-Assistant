const express = require("express");
const router = express.Router();
const QuizQuestion = require("../models/QuizQuestion");
const QuizAttempt = require("../models/QuizAttempt");
const QuizAnswer = require("../models/QuizAnswer");
const Skill = require("../models/Skill");
const UserSkillProgress = require("../models/UserSkillProgress");

// GET /api/quiz/questions?domainId=xxx
router.get("/questions", async (req, res) => {
    try {
        const { domainId } = req.query;

        if (!domainId) {
            return res.status(400).json({ error: "domainId is required" });
        }

        // Find all skills for this domain
        const skills = await Skill.find({ domain_id: domainId });
        const skillIds = skills.map((s) => s._id);

        // Find all questions for these skills
        const questions = await QuizQuestion.find({ skill_id: { $in: skillIds } })
            .populate("skill_id", "name difficulty_level");

        // Shuffle and pick 10 questions
        const shuffled = questions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);

        res.json(selected);
    } catch (error) {
        console.error("Get questions error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/quiz/daily?userId=xxx — Get 10 questions focused on weak skills
router.get("/daily", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        // Find user's weak skills
        const weakProgress = await UserSkillProgress.find({ user_id: userId, is_weak: true });
        let skillIds = weakProgress.map((wp) => wp.skill_id);

        // If no weak skills, get all skills from user's domain
        if (skillIds.length === 0) {
            const allProgress = await UserSkillProgress.find({ user_id: userId });
            skillIds = allProgress.map((p) => p.skill_id);
        }

        // If still no skills (fresh user), get questions from all skills
        let questions;
        if (skillIds.length > 0) {
            questions = await QuizQuestion.find({ skill_id: { $in: skillIds } })
                .populate("skill_id", "name difficulty_level");
        } else {
            questions = await QuizQuestion.find()
                .populate("skill_id", "name difficulty_level");
        }

        // Shuffle and pick 10
        const shuffled = questions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);

        res.json(selected);
    } catch (error) {
        console.error("Get daily questions error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/quiz/submit
router.post("/submit", async (req, res) => {
    try {
        const { userId, domainId, answers } = req.body;
        // answers: [{ questionId, selectedAnswer }]

        if (!userId || !domainId || !answers || !answers.length) {
            return res.status(400).json({ error: "userId, domainId, and answers are required" });
        }

        // Fetch the questions to check correctness
        const questionIds = answers.map((a) => a.questionId);
        const questions = await QuizQuestion.find({ _id: { $in: questionIds } });
        const questionMap = {};
        questions.forEach((q) => {
            questionMap[q._id.toString()] = q;
        });

        // Calculate score
        let correctCount = 0;
        const answerDocs = answers.map((a) => {
            const question = questionMap[a.questionId];
            const isCorrect = question && question.correct_answer === a.selectedAnswer;
            if (isCorrect) correctCount++;
            return {
                question_id: a.questionId,
                selected_answer: a.selectedAnswer,
                is_correct: isCorrect || false,
            };
        });

        const score = Math.round((correctCount / answers.length) * 100);

        // Determine level
        let level_assigned = "Beginner";
        if (score >= 80) level_assigned = "Advanced";
        else if (score >= 50) level_assigned = "Intermediate";

        // Create attempt
        const attempt = await QuizAttempt.create({
            user_id: userId,
            domain_id: domainId,
            score,
            level_assigned,
        });

        // Save individual answers
        const answersWithAttempt = answerDocs.map((a) => ({
            ...a,
            attempt_id: attempt._id,
        }));
        await QuizAnswer.insertMany(answersWithAttempt);

        // Update skill progress based on answers
        for (const a of answerDocs) {
            const question = questionMap[a.question_id.toString()];
            if (!question) continue;

            const existing = await UserSkillProgress.findOne({
                user_id: userId,
                skill_id: question.skill_id,
            });

            if (existing) {
                // Update progress
                const newProgress = a.is_correct
                    ? Math.min(existing.progress_percent + 10, 100)
                    : Math.max(existing.progress_percent - 5, 0);
                existing.progress_percent = newProgress;
                existing.is_weak = newProgress < 40;
                await existing.save();
            } else {
                await UserSkillProgress.create({
                    user_id: userId,
                    skill_id: question.skill_id,
                    progress_percent: a.is_correct ? 10 : 0,
                    is_weak: !a.is_correct,
                });
            }
        }

        res.json({
            attempt: {
                id: attempt._id,
                score,
                level_assigned,
                correctCount,
                totalQuestions: answers.length,
            },
            weakSkills: await UserSkillProgress.find({ user_id: userId, is_weak: true })
                .populate("skill_id", "name"),
        });
    } catch (error) {
        console.error("Submit quiz error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
