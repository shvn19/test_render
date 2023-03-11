const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

console.log('#10 config cloudinary ...');
cloudinary.config({
  // cloud_name: "dkpz3hast",
  // api_key: "821282333245719",
  // api_secret: "oBp5uM9JT-twHVwYSqsapQ5rZjA",
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // params: {
  //   format: ['jpg', 'jpeg', 'png'],
  //   // folder: 'uploaded_photos',
  //   // public_id: (req, file) => {
  //   //   console.log('# ', `photo-${Date.now()}`);
  //   //   return `photo`;
  //   // }
  // },
  // allowedFormats: ['jpg', 'png'],
  params: {
    public_id: (req, file) => {
      return `photo-${Date.now()}`
    },
  },
  // filename: function (req, file, cb) {
  //   console.log('#11 file', file);
  //   cb(null, file.originalname); 
  // }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;