const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    domain_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Domain",
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    level_assigned: {
        type: String,
        maxlength: 20,
        enum: ["Beginner", "Intermediate", "Advanced"],
    },
    taken_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
