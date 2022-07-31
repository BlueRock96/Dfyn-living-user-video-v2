var express = require("express");
var multer = require("multer");
var path = require("path");
var cors = require('cors');
var app = express();
var fetch = require('node-fetch');
require('dotenv').config()

var users = require('./routes/users')
const channelRoute = require('./routes/channel');
const videoRoute = require('./routes/videoRoute');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://root:${process.env.mongoPW}@cluster0.dwfid.mongodb.net/?retryWrites=true&w=majority`)


//init app
//set the template engine
app.set("view engine", "ejs");
app.use(cors())
app.use(express.json());
app.use(users)
app.use(channelRoute);
app.use(videoRoute);
//fetch data from the request
app.use(express.urlencoded({ extended: false }));
//static folder
// app.use(express.static(path.resolve(__dirname, "public")));
//default pageload
// app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));



// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });



//assign port
var port = process.env.PORT || 7001;
app.listen(port, () => console.log("server run at port " + port));
