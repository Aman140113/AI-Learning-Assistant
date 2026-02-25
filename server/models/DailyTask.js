const mongoose = require("mongoose");

const dailyTaskSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 200,
    },
    xp_reward: {
        type: Number,
        default: 10,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completed_at: {
        type: Date,
        default: null,
    },
    date: {
        type: String, // "YYYY-MM-DD" format for easy querying by day
        required: true,
    },
});

// Compound index - quickly find tasks for a user on a specific date
dailyTaskSchema.index({ user_id: 1, date: 1 });

module.exports = mongoose.model("DailyTask", dailyTaskSchema);
