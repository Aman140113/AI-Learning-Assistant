const mongoose = require("mongoose");

const userDomainSchema = new mongoose.Schema({
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
    selected_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("UserDomain", userDomainSchema);
