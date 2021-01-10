var express = require('express');
var aws = require('aws-sdk')
//Setup mongo
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongo-admin:<password>@cluster0.ltwaf.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("We are connected");

  client.close();
});




// Get keys from .env
const { S3_ACCESS_ID, S3_SECRET_ACCESS_KEY } = require('./config')

var app = express();
var s3 = new aws.S3();
app.use(express.static('public'));

var multer = require('multer');
var multerS3 = require('multer-s3');

var cors = require('cors');
var bodyParser = require('body-parser');


aws.config.update({
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    accessKeyId: S3_ACCESS_ID,
    region: 'us-east-1'
});

app.use(bodyParser.json());

  var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'shopify-image-repo-leungjch',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        },
        limits: 1024 * 1024 * 5,
    })
});



app.use(cors())
// For parsing json requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/upload', upload.array('upl'), function (req, res, next) {
    console.log("FILES HERE", req.files)
    // res.send("Uploaded!");
    res.redirect('/');
});

  

app.get('./get_images', function(req, res) {
    console.log("Get images request");
});


app.listen(8000, function() 
{
    console.log('App running on port 8000');
});
