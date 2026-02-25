const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
    skill_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
    },
    question_text: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correct_answer: {
        type: Number,
        required: true,
    },
    explanation: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
