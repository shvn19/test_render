// call all the required packages
require('dotenv').config();
const express = require('express')
const multer = require('multer');
const fileUploader = require('./configs/cloudinary.config')
const app = express();

const PORT = 5000;

app.use(express());

console.log('pro ', process.env.CLOUDINARY_NAME);

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

//CREATE EXPRESS APP

 
// ROUTES
app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
})

// app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
app.post('/uploadfile', fileUploader.single('myFile'), (req, res, next) => {
  const file = req.file
  console.log('#1.1 come here')
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  console.log('#1 file taken')
  res.json({ secure_url: req.file.path });
})

//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(files)
})
 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));