const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    domain_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Domain",
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
    },
    difficulty_level: {
        type: String,
        maxlength: 20,
        enum: ["Easy", "Medium", "Hard"],
    },
});

module.exports = mongoose.model("Skill", skillSchema);
