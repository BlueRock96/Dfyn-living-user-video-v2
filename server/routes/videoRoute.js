var express = require('express');
var router = express.Router();
var validator = require("validator");
const mongoose = require('mongoose');
const Video = require('../models/videos');
const Like = require('../models/like');
const Channel = require('../models/channel');
const { result } = require('lodash');

router.post('/create-video', async(req, res) => {
    var { title, channel, description, url, thumbnail, category } = req.body;
    var createVideo = new Video({
        _id: mongoose.Types.ObjectId(),
        title,
        channel,
        description,
        url,
        thumbnail,
        category
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

    Video.find().populate('channel', 'name thumbnail subscribe').populate('category', '_id').exec().then(result => {
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
                    categoryId : video.category._id,
                    uploadDate : video.created_at,
                }
            })
        });
    }).catch(e=>{console.log(e);});
    
    
});

router.get('/getvideo/:id', async(req, res) => {
    try {
        var id = req.params.id
        var response = {};
        Video.findById(id).populate('channel', 'name thumbnail subscribe').populate('category', '_id').exec().then( async(doc) => {
            if(doc) {
                // res.status(200).json(doc);
                response.id = doc._id;
                response.title = doc.title;
                response.description = doc.description;
                response.url = doc.url;
                response.thumbnail = doc.thumbnail;
                response.channel = doc.channel;
                response.view = doc.total_view+1;
                response.categoryId  = doc.category._id;
                response.uploadDate  = doc.created_at;
                var featured_videos = await Video.find({_id: {$nin: id}}).populate('channel', 'name').exec();
                await Video.findOneAndUpdate({_id:id},{total_view : doc.total_view+1}).exec();
                var featured_videoArray = featured_videos.map(featured_video => {
                    return {
                        id : featured_video._id,
                        title : featured_video.title,
                        channel : featured_video.channel.name,
                        view : featured_video.total_view,
                        uploadDate : featured_video.created_at
                    }
                })
                response.featured_videos = featured_videoArray
                res.status(200).json(response);
            } else {
                response.msg = 'Video Not avalible.';
                return res.status(404).json(response);
            }
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error})
    }
});

router.post('/like-video', async(req, res) => {
    try {
        var response = {};
		response['status'] = 'error';
		response['msg'] = '';

        var userId = req.body.userid;
        var videoId = req.body.videoid;
        // Video.findOneAndUpdate({_id:videoId}, {})

        const createLike = new Like({
                _id: mongoose.Types.ObjectId(),
                video: videoId,
                user: userId,
            });
        createLike.save().then(result => { res.status(200).json({"msg":"Done"})});
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
            res.status(200).json({
                data: result.map(doc => {
                    return {
                        videoId: doc.video
                    }
                })
            });
        })
    } catch (error) {
        console.log(error);
        res.status(200).json(error);
    }
});


module.exports = router;
