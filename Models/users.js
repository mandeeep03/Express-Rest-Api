const mongoose = require('mongoose')

//schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
        type: String,
        required: true,
        },
        lastName: {
        type: String,
        },
        email: {
        type: String,
        unique: true,
        },
        jobTitle: {
        type: String,
        },
        gender: {
        type: String,
        },
    },
    {
        timestamps: true,
    }
);

//Model
const User = mongoose.model("user", userSchema);

module.exports = User;
