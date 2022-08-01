const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, require: true},
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Category', categorySchema);
