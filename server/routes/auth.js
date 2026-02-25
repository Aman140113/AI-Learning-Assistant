const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

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
        });

        res.status(201).json({
            message: "Account created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
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
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
