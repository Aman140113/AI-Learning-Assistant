const express = require("express");
const router = express.Router();
const Domain = require("../models/Domain");
const UserDomain = require("../models/UserDomain");

// GET /api/domains — List all domains
router.get("/", async (req, res) => {
    try {
        const domains = await Domain.find();
        res.json(domains);
    } catch (error) {
        console.error("Get domains error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/domains/select — Save user's domain selection
router.post("/select", async (req, res) => {
    try {
        const { userId, domainId } = req.body;

        if (!userId || !domainId) {
            return res.status(400).json({ error: "userId and domainId are required" });
        }

        // Check if already selected
        const existing = await UserDomain.findOne({
            user_id: userId,
            domain_id: domainId,
        });

        if (existing) {
            return res.json({ message: "Domain already selected", userDomain: existing });
        }

        const userDomain = await UserDomain.create({
            user_id: userId,
            domain_id: domainId,
        });

        res.status(201).json({ message: "Domain selected", userDomain });
    } catch (error) {
        console.error("Select domain error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/domains/user/:userId — Get domains selected by a user
router.get("/user/:userId", async (req, res) => {
    try {
        const userDomains = await UserDomain.find({ user_id: req.params.userId })
            .populate("domain_id");
        res.json(userDomains);
    } catch (error) {
        console.error("Get user domains error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
