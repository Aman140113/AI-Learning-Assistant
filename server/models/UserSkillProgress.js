const mongoose = require("mongoose");

const userSkillProgressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    skill_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
    },
    progress_percent: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    is_weak: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("UserSkillProgress", userSkillProgressSchema);
