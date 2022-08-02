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
        console.log("subscribr api", req.body);
        var userId = req.body.userId;
        var channelId = req.body.channelId;

        Channel.findById(channelId).exec().then(doc => {
            Channel.findByIdAndUpdate({_id:channelId},{subscribe:doc.subscribe+1}).exec();
        })

        var createSubscription = new Subscription({
            _id: mongoose.Types.ObjectId(),
            channel: channelId,
            user: userId
        });

        createSubscription.save().then(result => {
            // console.log(result);
            res.status(200).json(result);
        })

    } catch (error) {
        console.log(error);
    }
});

router.post('/subscribed-channel', async(req, res) => {
    try {
        var userId = req.body.userId;

        Subscription.find({user:userId}).exec().then(docs => {
            res.status(200).json({
                data: docs.map(doc => {
                    return {
                        channelId:doc.channel
                    }
                })
            })
        })


    } catch (error) {
        console.log(error);
    }
});



module.exports = router;
