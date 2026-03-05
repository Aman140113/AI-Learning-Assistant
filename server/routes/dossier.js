const express = require("express");
const mongoose = require("mongoose");
const PDFDocument = require("pdfkit");
const router = express.Router();
const UserProfile = require("../models/UserProfile");
const User = require("../models/User");
const Certification = require("../models/Certification");
const UserDomain = require("../models/UserDomain");

// ══════════════════════════════════════
//  GET /api/dossier/profile/:userId
// ══════════════════════════════════════
router.get("/profile/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const profile = await UserProfile.findOne({ user_id: userId });
        if (!profile) {
            // Return default empty profile with auto-populated fields
            const user = await User.findById(userId);
            const cert = await Certification.findOne({ user_id: userId, passed: true, level: "PL-1" });
            const userDomain = await UserDomain.findOne({ user_id: userId })
                .populate("domain_id", "name")
                .sort({ selected_at: -1 });

            return res.json({
                exists: false,
                profile: {
                    user_id: userId,
                    licence_id: cert?.licence_id || null,
                    domain: userDomain?.domain_id?.name || "",
                    name: user?.name || "",
                    email: user?.email || "",
                    phone: "",
                    linkedin: "",
                    github: "",
                    education: [],
                    skills: [],
                    projects: [],
                    achievements: [],
                    activities: [],
                },
            });
        }

        const user = await User.findById(userId);
        res.json({
            exists: true,
            profile: {
                ...profile.toObject(),
                name: user?.name || "",
                email: user?.email || "",
            },
        });
    } catch (error) {
        console.error("Get dossier profile error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ══════════════════════════════════════
//  PUT /api/dossier/profile/:userId
// ══════════════════════════════════════
router.put("/profile/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const { phone, linkedin, github, education, skills, projects, achievements, activities } = req.body;

        // Auto-populate licence_id and domain
        const cert = await Certification.findOne({ user_id: userId, passed: true, level: "PL-1" });
        const userDomain = await UserDomain.findOne({ user_id: userId })
            .populate("domain_id", "name")
            .sort({ selected_at: -1 });

        const profileData = {
            user_id: userId,
            licence_id: cert?.licence_id || null,
            domain: userDomain?.domain_id?.name || "",
            phone: phone || "",
            linkedin: linkedin || "",
            github: github || "",
            education: education || [],
            skills: skills || [],
            projects: projects || [],
            achievements: achievements || [],
            activities: activities || [],
            updatedAt: new Date(),
        };

        // Set completedAt on first save if profile has meaningful data
        const existing = await UserProfile.findOne({ user_id: userId });
        if (!existing) {
            profileData.completedAt = new Date();
        }

        const profile = await UserProfile.findOneAndUpdate(
            { user_id: userId },
            profileData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const user = await User.findById(userId);
        res.json({
            message: "Profile saved successfully",
            profile: {
                ...profile.toObject(),
                name: user?.name || "",
                email: user?.email || "",
            },
        });
    } catch (error) {
        console.error("Save dossier profile error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ══════════════════════════════════════
//  Admin: GET /api/dossier/search
// ══════════════════════════════════════
router.get("/search", async (req, res) => {
    try {
        const { domain, skill, certification, q } = req.query;

        // Start with all users
        let userFilter = {};
        let userIds = null;

        // Filter by domain
        if (domain) {
            const Domain = require("../models/Domain");
            const domainDoc = await Domain.findById(domain);
            if (domainDoc) {
                const domainUsers = await UserDomain.find({ domain_id: domain }).select("user_id");
                userIds = domainUsers.map(d => d.user_id.toString());
            }
        }

        // Filter by certification
        if (certification) {
            const certFilter = { passed: true };
            if (certification !== "any") {
                certFilter.level = certification;
            }
            const certUsers = await Certification.find(certFilter).select("user_id");
            const certUserIds = certUsers.map(c => c.user_id.toString());

            if (userIds !== null) {
                userIds = userIds.filter(id => certUserIds.includes(id));
            } else {
                userIds = certUserIds;
            }
        }

        // Filter by skill (search in UserProfile skills array)
        if (skill) {
            const profilesWithSkill = await UserProfile.find({
                skills: { $regex: skill, $options: "i" },
            }).select("user_id");
            const skillUserIds = profilesWithSkill.map(p => p.user_id.toString());

            if (userIds !== null) {
                userIds = userIds.filter(id => skillUserIds.includes(id));
            } else {
                userIds = skillUserIds;
            }
        }

        // Build user query
        if (userIds !== null) {
            userFilter._id = { $in: userIds.map(id => new mongoose.Types.ObjectId(id)) };
        }

        // Text search
        if (q) {
            userFilter.$or = [
                { name: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } },
            ];
        }

        const users = await User.find(userFilter).select("-password_hash").sort({ name: 1 });

        // Enrich with profile, domain, and certification data
        const results = await Promise.all(
            users.map(async (user) => {
                const profile = await UserProfile.findOne({ user_id: user._id });
                const userDomain = await UserDomain.findOne({ user_id: user._id })
                    .populate("domain_id", "name")
                    .sort({ selected_at: -1 });
                const certs = await Certification.find({ user_id: user._id, passed: true });

                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    domain: userDomain?.domain_id?.name || "Not selected",
                    skills: profile?.skills || [],
                    certifications: certs.map(c => ({
                        level: c.level,
                        licence_id: c.licence_id,
                        score: c.score,
                        issued_at: c.issued_at,
                    })),
                    hasProfile: !!profile,
                    profileCompletedAt: profile?.completedAt || null,
                };
            })
        );

        res.json(results);
    } catch (error) {
        console.error("Dossier search error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ══════════════════════════════════════
//  Admin: GET /api/dossier/download/:userId
// ══════════════════════════════════════
router.get("/download/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const profile = await UserProfile.findOne({ user_id: userId });
        const certs = await Certification.find({ user_id: userId, passed: true });
        const userDomain = await UserDomain.findOne({ user_id: userId })
            .populate("domain_id", "name")
            .sort({ selected_at: -1 });

        // Create PDF
        const doc = new PDFDocument({ margin: 50, size: "A4" });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=Dossier_${user.name.replace(/\s+/g, "_")}.pdf`);
        doc.pipe(res);

        // ── Header ──
        doc.rect(0, 0, doc.page.width, 120).fill("#1a1a2e");
        doc.fontSize(28).fill("#00F5D4").text("TRAINEE DOSSIER", 50, 35, { align: "left" });
        doc.fontSize(11).fill("#94a3b8").text("SkillSpark AI — Learning Assistant", 50, 70);
        doc.fontSize(9).fill("#64748b").text(`Generated: ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`, 50, 90);

        let y = 140;

        // ── Profile Section ──
        doc.rect(50, y, doc.page.width - 100, 2).fill("#00F5D4");
        y += 15;
        doc.fontSize(16).fill("#1e293b").text("PROFILE", 50, y);
        y += 30;

        const profileRows = [
            ["Name", user.name],
            ["Email", user.email],
            ["Domain", userDomain?.domain_id?.name || "Not selected"],
            ["Phone", profile?.phone || "—"],
            ["LinkedIn", profile?.linkedin || "—"],
            ["GitHub", profile?.github || "—"],
        ];

        for (const [label, value] of profileRows) {
            doc.fontSize(10).fill("#64748b").text(label + ":", 60, y, { width: 100 });
            doc.fontSize(10).fill("#1e293b").text(value, 170, y, { width: 350 });
            y += 20;
        }

        // ── Certifications ──
        if (certs.length > 0) {
            y += 15;
            doc.rect(50, y, doc.page.width - 100, 2).fill("#8b5cf6");
            y += 15;
            doc.fontSize(16).fill("#1e293b").text("CERTIFICATIONS", 50, y);
            y += 30;

            for (const cert of certs) {
                doc.fontSize(10).fill("#1e293b").text(`• ${cert.level}`, 60, y);
                doc.fontSize(9).fill("#64748b").text(`Licence: ${cert.licence_id || "N/A"}  |  Score: ${cert.score}%  |  Date: ${new Date(cert.issued_at).toLocaleDateString()}`, 120, y);
                y += 22;
            }
        }

        // ── Education ──
        if (profile?.education?.length > 0) {
            y += 15;
            if (y > 700) { doc.addPage(); y = 50; }
            doc.rect(50, y, doc.page.width - 100, 2).fill("#3b82f6");
            y += 15;
            doc.fontSize(16).fill("#1e293b").text("EDUCATION", 50, y);
            y += 30;

            for (const edu of profile.education) {
                doc.fontSize(11).fill("#1e293b").text(`${edu.degree} in ${edu.field}`, 60, y);
                y += 16;
                doc.fontSize(9).fill("#64748b").text(`${edu.institution}  |  ${edu.startYear} — ${edu.endYear}`, 60, y);
                y += 22;
            }
        }

        // ── Skills ──
        if (profile?.skills?.length > 0) {
            y += 15;
            if (y > 700) { doc.addPage(); y = 50; }
            doc.rect(50, y, doc.page.width - 100, 2).fill("#10b981");
            y += 15;
            doc.fontSize(16).fill("#1e293b").text("SKILLS", 50, y);
            y += 30;
            doc.fontSize(10).fill("#1e293b").text(profile.skills.join("  •  "), 60, y, { width: doc.page.width - 120 });
            y += Math.ceil(profile.skills.length / 5) * 18 + 10;
        }

        // ── Projects ──
        if (profile?.projects?.length > 0) {
            y += 15;
            if (y > 700) { doc.addPage(); y = 50; }
            doc.rect(50, y, doc.page.width - 100, 2).fill("#f59e0b");
            y += 15;
            doc.fontSize(16).fill("#1e293b").text("PROJECTS", 50, y);
            y += 30;

            for (const proj of profile.projects) {
                if (y > 700) { doc.addPage(); y = 50; }
                doc.fontSize(11).fill("#1e293b").text(proj.title, 60, y);
                y += 16;
                if (proj.description) {
                    doc.fontSize(9).fill("#475569").text(proj.description, 60, y, { width: doc.page.width - 120 });
                    y += doc.heightOfString(proj.description, { width: doc.page.width - 120, fontSize: 9 }) + 4;
                }
                if (proj.technologies) {
                    doc.fontSize(9).fill("#64748b").text(`Tech: ${proj.technologies}`, 60, y);
                    y += 14;
                }
                if (proj.link) {
                    doc.fontSize(9).fill("#3b82f6").text(`Link: ${proj.link}`, 60, y);
                    y += 14;
                }
                y += 10;
            }
        }

        // ── Achievements ──
        if (profile?.achievements?.length > 0) {
            y += 15;
            if (y > 700) { doc.addPage(); y = 50; }
            doc.rect(50, y, doc.page.width - 100, 2).fill("#ef4444");
            y += 15;
            doc.fontSize(16).fill("#1e293b").text("ACHIEVEMENTS", 50, y);
            y += 30;

            for (const ach of profile.achievements) {
                if (y > 700) { doc.addPage(); y = 50; }
                doc.fontSize(11).fill("#1e293b").text(ach.title, 60, y);
                y += 16;
                if (ach.description) {
                    doc.fontSize(9).fill("#475569").text(ach.description, 60, y, { width: doc.page.width - 120 });
                    y += doc.heightOfString(ach.description, { width: doc.page.width - 120, fontSize: 9 }) + 4;
                }
                if (ach.date) {
                    doc.fontSize(9).fill("#64748b").text(`Date: ${ach.date}`, 60, y);
                    y += 14;
                }
                y += 10;
            }
        }

        // ── Activities ──
        if (profile?.activities?.length > 0) {
            y += 15;
            if (y > 700) { doc.addPage(); y = 50; }
            doc.rect(50, y, doc.page.width - 100, 2).fill("#6366f1");
            y += 15;
            doc.fontSize(16).fill("#1e293b").text("ACTIVITIES", 50, y);
            y += 30;

            for (const act of profile.activities) {
                if (y > 700) { doc.addPage(); y = 50; }
                doc.fontSize(11).fill("#1e293b").text(act.title, 60, y);
                if (act.role) {
                    doc.fontSize(9).fill("#8b5cf6").text(`  — ${act.role}`, 60 + doc.widthOfString(act.title, { fontSize: 11 }) + 5, y + 1);
                }
                y += 16;
                if (act.description) {
                    doc.fontSize(9).fill("#475569").text(act.description, 60, y, { width: doc.page.width - 120 });
                    y += doc.heightOfString(act.description, { width: doc.page.width - 120, fontSize: 9 }) + 4;
                }
                y += 10;
            }
        }

        // ── Footer ──
        doc.fontSize(8).fill("#94a3b8").text(
            "This dossier was auto-generated by SkillSpark AI. All information is provided by the trainee.",
            50,
            doc.page.height - 40,
            { align: "center", width: doc.page.width - 100 }
        );

        doc.end();
    } catch (error) {
        console.error("Dossier PDF download error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
