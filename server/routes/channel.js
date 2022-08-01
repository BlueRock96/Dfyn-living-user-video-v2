const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validator = require("validator");
const channel = require('../models/channel');
const Channel = require('../models/channel');
const Subscription = require('../models/subscribeaction');


router.post('/create-channel', async(req, res) => {
    var name = req.body.name;
    var thumbnail = req.body.thumbnail;
    // console.log(name, thumbnail);
    const createChannel = new Channel({
        _id: mongoose.Types.ObjectId(),
        name: name,
        thumbnail: thumbnail
    });
    createChannel.save().then(result => {
        res.status(200).json(result);
    })
});

router.post('/subscribe', async(req, res) => {
    try {
        var usedId = req.body.usedId;
        var channelId = req.body.channelId;

        Channel.findById(channelId).exec().then(doc => {
            Channel.findByIdAndUpdate({_id:channelId},{subscribe:doc.subscribe+1}).exec();
        })

        var createSubscription = new Subscription({
            _id: mongoose.Types.ObjectId(),
            channel: channelId,
            user: usedId
        });

        createSubscription.save().then(result => {
            // console.log(result);
            res.status(200).json(result);
        })

    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
