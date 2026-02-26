const express = require("express");
const router = express.Router();
const User = require("../models/User");
const QuizAttempt = require("../models/QuizAttempt");
const QuizAnswer = require("../models/QuizAnswer");
const UserSkillProgress = require("../models/UserSkillProgress");
const UserDomain = require("../models/UserDomain");
const LearningPathItem = require("../models/LearningPathItem");
const DailyTask = require("../models/DailyTask");

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered" });
        }

        // Create user (storing password as plain text for hackathon)
        const user = await User.create({
            name,
            email,
            password_hash: password,
            avatar: avatar || null,
        });

        res.status(201).json({
            message: "Account created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Plain text comparison (hackathon only)
        if (user.password_hash !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// PUT /api/auth/user/:userId — Update user avatar
router.put("/user/:userId", async (req, res) => {
    try {
        const { avatar } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { avatar },
            { new: true }
        );
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({
            message: "Avatar updated",
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
        });
    } catch (error) {
        console.error("Update avatar error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE /api/auth/user/:userId — Delete user and ALL related data
router.delete("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Cascading delete from all collections
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

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Delete account error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
