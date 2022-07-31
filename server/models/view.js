const mongoose = require("mongoose");

const viewSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    video: { type: mongoose.Types.ObjectId, require: true, ref: 'Video'},
    user: { type: mongoose.Types.ObjectId, require: true },
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
})

module.exports = mongoose.model('View', viewSchema);
