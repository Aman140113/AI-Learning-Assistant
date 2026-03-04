const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    domain_id: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ["PL-1", "PL-2"],
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    passed: {
        type: Boolean,
        required: true,
    },
    licence_id: {
        type: String,
        unique: true,
        sparse: true, // Only passing scores get a licence_id
    },
    issued_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Certification", certificationSchema);
