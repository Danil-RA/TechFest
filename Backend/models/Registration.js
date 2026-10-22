const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    registeredAt: {
        type: Date,
        default: Date.now
    }
});

const Registration = mongoose.model("Registration", regSchema);

module.exports = Registration;