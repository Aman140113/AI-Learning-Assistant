const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    licence_id: {
        type: String,
        default: null,
    },
    domain: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    linkedin: {
        type: String,
        default: "",
    },
    github: {
        type: String,
        default: "",
    },
    education: [
        {
            institution: { type: String, default: "" },
            degree: { type: String, default: "" },
            field: { type: String, default: "" },
            startYear: { type: String, default: "" },
            endYear: { type: String, default: "" },
        },
    ],
    skills: [{ type: String }],
    projects: [
        {
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            technologies: { type: String, default: "" },
            link: { type: String, default: "" },
        },
    ],
    achievements: [
        {
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            date: { type: String, default: "" },
        },
    ],
    activities: [
        {
            title: { type: String, default: "" },
            role: { type: String, default: "" },
            description: { type: String, default: "" },
        },
    ],
    completedAt: {
        type: Date,
        default: null,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
