var express = require("express");
// var mongoose = require("mongoose");
var multer = require("multer");
var path = require("path");
// var csvModel = require("./models/csv");
// var csv = require("csvtojson");
var cors = require('cors');
// var XLSX = require('xlsx');
var app = express();
var fetch = require('node-fetch');
require('dotenv').config()

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, file.originalname);
//   },
// });

// var uploads = multer({ storage: storage,fileFilter(req, file, cb) {
//   if (!file.originalname.match(/\.(csv|xlsx|xls)$/)) {
//     // upload only png and jpg format
//     return cb(new Error("Please upload a excel file")); 
//   }
//   cb(undefined, true);
// } });

 

// app.use((err, req, res, next) => {
//   //console.log(req.originalUrl); //Get the Route Name
//   // This check makes sure this is a JSON parsing issue, but it might be
//   // coming from any middleware, not just body-parser:
//   if(err instanceof multer.MulterError && err.name === 'MulterError');
//       res.status(400).send({message: 'Unable to upload. Parameter \'file\' is missing'});

//   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//       console.error(err);
//       return res.sendStatus(400); // Bad request
//   }
//   next();
// });


// //connect to db
// mongoose
//   .connect("mongodb+srv://dfynliving:Dfyn995599@cluster0.fiuju.mongodb.net/dfyn_living?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("connected to db"))
//   .catch((err) => console.log(err));
//init app
//set the template engine
app.set("view engine", "ejs");
app.use(cors())

app.use(express.json());
//fetch data from the request
app.use(express.urlencoded({ extended: false }));
//static folder
// app.use(express.static(path.resolve(__dirname, "public")));
//default pageload
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


// app.get("/getData", (req, res) => {
//   csvModel.find((err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (data != "") {
//         res.render("demo", { data: data });
//       } else {
//         res.render("demo", { data: "" });
//       }
//     }
//   });
// });

// var temp;
// app.post("/", uploads.single("csv"), (req, res) => {
//   //convert csvfile to jsonArray
//   console.log(req.file);
//   csv()
//     .fromFile(req.file.path)
//     .then((jsonObj) => {
//       // console.log(jsonObj);
//       //the jsonObj will contain all the data in JSONFormat.
//       //but we want columns Test1,Test2,Test3,Test4,Final data as number .
//       //becuase we set the dataType of these fields as Number in our mongoose.Schema().
//       //here we put a for loop and change these column value in number from string using parseFloat().
//       //here we use parseFloat() beause because these fields contain the float values.
//       for (var x = 0; x < jsonObj; x++) {
//         temp = parseFloat(jsonObj[x].Test1);
//         jsonObj[x].Test1 = temp;
//         temp = parseFloat(jsonObj[x].Test2);
//         jsonObj[x].Test2 = temp;
//         temp = parseFloat(jsonObj[x].Test3);
//         jsonObj[x].Test3 = temp;
//         temp = parseFloat(jsonObj[x].Test4);
//         jsonObj[x].Test4 = temp;
//         temp = parseFloat(jsonObj[x].Final);
//         jsonObj[x].Final = temp;
//       }
//       //insertmany is used to save bulk data in database.
//       //saving the data in collection(table)
//       csvModel.insertMany(jsonObj, (err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.redirect("/");
//         }
//       });
//     });
// });

// const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

// app.post("/upload", uploads.single("csv"),  (req, res) => {
//   try {
  
//     // console.log(req.file);
//   //convert csvfile to jsonArray
//   // console.log(req.file.path);

//   var workbook = XLSX.readFile(__dirname + '/' + req.file.path);
//   var sheet_name_list = workbook.SheetNames;
  
//   const columnsArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list], { header: 1 })[0];
//   // console.log(columnsArray);
//   const header = [ 'Firstname', 'LastName','SSN', 'Test1','Test2', 'Test3','Test4', 'Final','Grade'];
//   if(!equals(columnsArray,  header)){
//     return res.status(400).send({message: ' Failed. Headers must match.'});
//   }
//   const jsonObj = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

//   // console.log(jsonObj);
//       for (var x = 0; x < jsonObj; x++) {
//         temp = parseFloat(jsonObj[x].Test1);
//         jsonObj[x].Test1 = temp;
//         temp = parseFloat(jsonObj[x].Test2);
//         jsonObj[x].Test2 = temp;
//         temp = parseFloat(jsonObj[x].Test3);
//         jsonObj[x].Test3 = temp;
//         temp = parseFloat(jsonObj[x].Test4);
//         jsonObj[x].Test4 = temp;
//         temp = parseFloat(jsonObj[x].Final);
//         jsonObj[x].Final = temp;
//       }
//       //insertmany is used to save bulk data in database.
//       //saving the data in collection(table)
//       csvModel.insertMany(jsonObj, (err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           // res.redirect("/");
//           res.status(200).send({message: 'Data Uploaded Successfully'});
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({message: "Internal Server Error. Please try again"})
//     }
    
// });


// app.post("/uploadNewFile", uploads.single("csv"), async (req, res) => {
//   try {

//     console.log(req.headers['access-token']);
//     const accessToken = req.headers['access-token'];
  
//     // console.log(req.file);
//   //convert csvfile to jsonArray
//   // console.log(req.file.path);

//   var workbook = XLSX.readFile(__dirname + '/' + req.file.path);
//   var sheet_name_list = workbook.SheetNames;
  
//   const columnsArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list], { header: 1 })[0];
//   // console.log(columnsArray);
//   // const header = [ 'Firstname', 'LastName','SSN', 'Test1','Test2', 'Test3','Test4', 'Final','Grade'];
//     const header = 
//     ['product_name','product_type','length','breadth','height','product_Details','quantity','amount','discount',
//     'productimage_1','category_id','made_to_order','field_5ff30f64794293706bacf872','varient_5f8eb304bfa73439b5b3603a',
//     'color','sizechart','product_subcategory_type','product_insidesubcategory_sub_type','gold_14k','gold_18k','gold_22k',
//     'gold_24k','total_carat','number_of_stones','price','clarity','polki_price','making_charges','total_price','weight_g',
//     'weight_kg','product_returns_available','delivery_charges','making_charge_discount','warranty_and_guarantee',
//     'fashion_size','size','hide_price','product_brand']


//     // const body = {a: 1};
//     // const response = await fetch('https://httpbin.org/post', {
//     //   method: 'post',
//     //   body: JSON.stringify(body),
//     //   headers: {'Content-Type': 'application/json'}
//     // });
//     // const data = await response.json();
//     // console.log('node-fetch ',data);

//     const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/product`, {
//       mode: 'cors', 
//       method: "POST",
//       headers: {"Content-Type":"application/x-www-form-urlencoded", 
//                 'x-access-token': `${accessToken}` },
//       body: new URLSearchParams({
//           phone_number: 'phoneNumber',
//           // password: password,
//           // country_code: countryCode
//         })
//      })
//       const data = await response.json();
//       console.log('node-fetch ',data);

//   if(!equals(columnsArray,  header)){
//     return res.status(400).send({message: 'Failed. Headers must match.'});
//   }
//   const jsonObj = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

//   // console.log(jsonObj);
//       for (var x = 0; x < jsonObj; x++) {
//         temp = parseFloat(jsonObj[x].Test1);
//         jsonObj[x].Test1 = temp;
//         temp = parseFloat(jsonObj[x].Test2);
//         jsonObj[x].Test2 = temp;
//         temp = parseFloat(jsonObj[x].Test3);
//         jsonObj[x].Test3 = temp;
//         temp = parseFloat(jsonObj[x].Test4);
//         jsonObj[x].Test4 = temp;
//         temp = parseFloat(jsonObj[x].Final);
//         jsonObj[x].Final = temp;
//       }
//       //insertmany is used to save bulk data in database.
//       //saving the data in collection(table)
//       csvModel.insertMany(jsonObj, (err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           // res.redirect("/");
//           res.status(200).send({message: 'Data Uploaded Successfully'});
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({message: "Internal Server Error. Please try again"})
//     }
// });



app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});



//assign port
var port = process.env.PORT || 7001;
app.listen(port, () => console.log("server run at port " + port));
