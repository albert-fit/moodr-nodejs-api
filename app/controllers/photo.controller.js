const multer = require('multer');
const path = require('path');
const dir = './public/photos'
const fs = require('fs');

const OpenAI = require("openai");

const openai = new OpenAI();


if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Init upload
const upload = multer({
  storage: storage
}).single('image');

exports.uploadPhoto = (req, res) => {
    console.log('received')
    console.log(req.file)
  upload(req, res, (err) => {
    if(err) {
        console.log(err);
      res.status(500).send({ message: "Error occurred while uploading photo." });
    } else {
        console.log(req.file);
      res.status(200).send(req.file);
    }
  });
};

// exports.analysePhoto = (req, res) => {
//   async function main() {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4-vision-preview",
//       messages: [
//         {
//           role: "user",
//           content: [
//             { type: "text", text: "What emotions is this person showing?" },
//             {
//               type: "image_url",
//               image_url: {
//                 "url": "https://media.istockphoto.com/id/1461077577/photo/spring-portrait-of-excited-young-woman.webp?b=1&s=170667a&w=0&k=20&c=Q3EUxr0Rpv1g4JJTdumH2IEb4marv2pCXZWZbBXuQa8=",
//               },
//             },
//           ],
//         },
//       ],
//     });
//     console.log(response.choices[0]);
//   }
//   main();