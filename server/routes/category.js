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
        Category.find().exec().then( doc => {
            res.status(200).json(doc);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
})

module.exports = router;
