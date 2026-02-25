const mongoose = require("mongoose");

const learningPathItemSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    week_number: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    resources: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    status: {
        type: String,
        maxlength: 20,
        enum: ["Completed", "Current", "Locked"],
        default: "Locked",
    },
});

module.exports = mongoose.model("LearningPathItem", learningPathItemSchema);
