const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://root:${process.env.mongoPW}@cluster0.dwfid.mongodb.net/?retryWrites=true&w=majority`)


// var Channel = require('./models/channel');

// const newChannel = new Channel({
//     _id: mongoose.Types.ObjectId(),
//     name: 'test',
//     thumbnail: 'test'
// });
// newChannel.save().then(result => {console.log(result);}).catch(e => {console.log(e);});

// const fs = require('fs');
// const path = require('path');

// const basename = path.basename(__filename);
// const functions = {}

// fs
//   .readdirSync("./")
//   .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .map((file) => {functions[file.slice(0, -3)] = require(path.join(__dirname, file))})

// module.exports = functions;
