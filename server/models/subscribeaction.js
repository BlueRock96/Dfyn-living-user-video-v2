const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    channel: { type: mongoose.Types.ObjectId, require: true, ref: 'Channel'},
    user: { type: mongoose.Types.ObjectId, require: true },
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Subscription', subscriptionSchema);
