const mongoose = require("mongoose");

const videosSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: { type: String, require: true },
    channel: { type: mongoose.Types.ObjectId, require: true, ref: 'Channel'},
    description: { type: String },
    url: { type: String },
    thumbnail: { type: String },
    total_view: { type: Number, default: 0},
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Video', videosSchema);