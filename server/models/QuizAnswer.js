const mongoose = require("mongoose");

const quizAnswerSchema = new mongoose.Schema({
    attempt_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizAttempt",
        required: true,
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizQuestion",
        required: true,
    },
    selected_answer: {
        type: Number,
        required: true,
    },
    is_correct: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("QuizAnswer", quizAnswerSchema);
