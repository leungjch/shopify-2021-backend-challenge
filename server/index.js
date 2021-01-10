var express = require('express');
// Get keys from .env
const { S3_ACCESS_ID, S3_SECRET_ACCESS_KEY, MONGO_ADMIN_PASSWORD, MONGO_DBNAME, MONGO_ADMIN_USER } = require('./config')

var aws = require('aws-sdk')
//Setup mongo
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://mongo-admin:${MONGO_ADMIN_PASSWORD}@cluster0.ltwaf.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);


async function mongoDB_insert(files) {
    try {
        // Connect to DB
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(MONGO_DBNAME);
        const col = db.collection("images");
        // Create image documents from uploaded files
        let imageDocuments = Array.from(files, x => ({name: x['originalName'], url: x['location']}))

        // Insert into DB
        const p = await col.insertMany(imageDocuments);
        // const myDoc = await col.findOne();
        // console.log(myDoc);
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}


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

    // Upload to mongodb
    mongoDB_insert(req.files).catch(console.dir);

    res.redirect('/');
});

  

app.get('./get_images', function(req, res) {
    console.log("Get images request");
});


app.listen(8000, function() 
{
    console.log('App running on port 8000');
});
