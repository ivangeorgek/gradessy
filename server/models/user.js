const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 30
    },
    isMentor: {
        type: Boolean,
        required: true
    },
    connections: {
        type: Array,
        default: []
    },
    areasOfExpertise: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    company: {
        type: String,
        default: "",
    },
    title : {   
        type: String,
        default: "",
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);