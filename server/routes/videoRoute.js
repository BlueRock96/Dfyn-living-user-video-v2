var express = require('express');
var router = express.Router();
var validator = require("validator");
const mongoose = require('mongoose');
const Video = require('../models/videos');
const Like = require('../models/like');
const Channel = require('../models/channel');
const { result } = require('lodash');

router.post('/create-video', async(req, res) => {
    var { title, channel, description, url, thumbnail } = req.body;
    var createVideo = new Video({
        _id: mongoose.Types.ObjectId(),
        title,
        channel,
        description,
        url,
        thumbnail,
    });

    createVideo.save().then(result => {console.log(result);
     res.send(result)
    }).catch(e => {console.log(e);});
});

router.get('/getvideos', async(req, res) => {
    
    var response = {};
    response['status'] = 'error';
    response['msg'] = '';

    // var userId = req.body.userid;

    // Video.find().exec().then(videos=>{
    //     res.status(200).json({
    //         data: videos.map(video => {
    //             return {
    //                 id: video._id,
    //                 title: video.title,
    //                 description: video.description,
    //                 url: video.url,
    //                 thumbnail: video.thumbnail,
    //                 channel: Channel.findById(video.channel).exec().then( result => {
    //                     return result
    //                 }),
    //                 like: Like.find({video: video._id}).exec().then( result => {
    //                     if(result.length != 0) {
    //                         return true
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // })

    // Video.find().populate('channel', 'name thumbnail subscribe').exec().then(result => {
    //     // res.status(200).json(result);
    //     result.map(video => {
    //         response.id = video._id;
    //         response.title = video.title;
    //         response.description = video.description;
    //         response.url = video.url;
    //         response.thumbnail = video.thumbnail;
    //         response.uploadDate = video.created_at;
    //         response.channel = video.channel;
    //         response.view = video.total_view;
    //     });
    // }).catch(e=>{console.log(e);});

    Video.find().populate('channel', 'name thumbnail subscribe').exec().then(result => {
        res.status(200).json({
            data: result.map(video => {
                return {
                    id: video._id,
                    title: video.title,
                    description: video.description,
                    url: video.url,
                    thumbnail: video.thumbnail,
                    channel: video.channel,
                    view: video.total_view,
                }
            })
        });
    }).catch(e=>{console.log(e);});
    
    
});

router.get('/getvideo/:id', async(req, res) => {
    try {
        var response = {};
		response['status'] = 'error';
		response['msg'] = '';
        Video.findById(id).exec().then(doc => {
            if(doc) {
                // res.status(200).json(doc);
                response.view = doc
                Video.find({_id: {$nin: id}}).exec().then(doc => {
                    response.recommended = doc
                    return res.status(200).json(response);
                })
            } else {
                response.msg = 'Video Not avalible.';
                return res.status(404).json(response);
            }
        })        
    } catch (error) {
        console.log(e);
        return res.status(500).json({error:e})
    }
});

router.post('/like-video', async(req, res) => {
    try {
        var response = {};
		response['status'] = 'error';
		response['msg'] = '';

        var userId = req.body.userid;
        var videoId = req.body.videoid;

        const createLike = new Like({
                _id: mongoose.Types.ObjectId(),
                video: videoId,
                user: userId,
            });
        createLike.save().then(result => { res.status(200).json(result)});
    } catch (error) {
        var response = {};
		response['status'] = 'error';
		response['msg'] = error;
        console.log(error);
        return res.status(500).json(response);
    }
});

router.get('/liked-video', async(req, res) => {
    try {
        var userId = req.body.userid;
        Like.find({user:userId}).exec().then(result => {
            res.status(200).json(result);
        })
    } catch (error) {
        console.log(error);
        res.status(200).json(error);
    }
});


module.exports = router;
