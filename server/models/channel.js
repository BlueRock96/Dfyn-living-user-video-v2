const mongoose = require("mongoose");


const channelSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    thumbnail: String,
    subscribe: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Channel', channelSchema);