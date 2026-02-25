const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
    },
    icon: {
        type: String,
        maxlength: 50,
    },
});

module.exports = mongoose.model("Domain", domainSchema);
