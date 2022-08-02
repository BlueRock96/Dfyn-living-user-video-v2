const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category');

router.post('/create-category', async(req, res) => {
    var name = req.body.name;
    const createCategory = new Category({
        _id: mongoose.Types.ObjectId(),
        name: name
    });
    createCategory.save().then(result => {
        res.status(200).json(result);
    })
});

router.get('/getCategory', async(req, res) => {
    try {
        Category.find().exec().then( docs => {
            res.status(200).json({
                data: docs.map(doc => {
                    return {
                        id: doc._id,
                        name: doc.name
                    }
                })
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
})

module.exports = router;
