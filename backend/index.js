require("dotenv").config();

const express = require("express");
const multer = require("multer");

const app = express();
const cors = require("cors");
const connection = require('./db');


// middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));


const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


cloudinary.config({
    cloud_name: "dw6s3hb8k",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

var storage =new  CloudinaryStorage({
    cloudinary: cloudinary,
      params: {
      folder: 'foo',
      format: 'mp4',
      resource_type: 'video'
    }
  });

// const storageVideo = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'nono',
//         format: 'mp4',
//         resource_type: 'video',
//         allowedFormats: ['mp4'],
//     }
// });

const storageImage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        transformation: [
            {width: 500, height: 500, crop: "fill"}
        ],
        format: 'jpg',
        resource_type: 'image',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

// const uploadAudio = multer({ storage: storageAudio });
const uploadImage = multer({ storage: storageImage });
const upload = multer({ storage: storage });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: "DEV",
//       format: ['jpeg', 'jpg', 'png', 'mp4'],
//       resource_type:"video"
//     },
//   });





// database connection
// connection();




// var storage1 = new CloudinaryStorage({
//     cloudinary: cloudinary,
//       params: {
//       folder: 'DEV',
//       format:  'mp4',
//     resource_type: 'video'
//     }
//   });

// var storage2 = new CloudinaryStorage({
//     cloudinary: cloudinary,
//       params: {
//       folder: 'DEV',
//     //   format:  'mp4',
//     // resource_type: 'video'
//     }
//   });
// const upload = multer({ storage: storage });

// var storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//       params: {
//       folder: 'DEV',
//       format:  'mp4',
//     resource_type: 'video'
//     }
//   });


//   const uploadimg = multer({ storage: storage2 });
//   const uploadvid = multer({ storage: storage1 });

// routes
app.get("/", (req,res) =>{
    res.send("Hello,  you are good to go!");
});




// app.post("/", upload.single("vid"), async (req, res) => {
//     return res.json({ picture: req.file.path });
//   });










app.post("/image", uploadImage.array("picture"), async (req, res) => {
    return res.json({ picture: req.files });
  });


app.get("/all-images",  async (req, res) => {
    try {
      const { resources } = await cloudinary.search
        .expression("folder:images")
        .sort_by("public_id", "desc")
        .max_results(30)
        .execute();
        console.log(resources)
      const url = resources.map((file) => file.url);
      res.status(200).send(url);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e.message });
    }
});
  




  
// app.post("/video", uploadvid.single("vid"), async (req, res) => {
//     return res.json({ picture: req.file });
//   });
  





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App is up and running on port : ${PORT} `);
})