const uploadFile = require("../middleware/upload");
var imageModel = require('../models/imageModel');
const fs = require('fs');

const upload = async (req, res) => {
  try {

    /* store the uploaded images on server using multer */
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    /* server side validation to upload only the image files*/
    // Allowed formats
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase());
    // Check mimetype in file data
    const mimetype = filetypes.test(req.file.mimetype);

    if(!(mimetype && extname)){
       return res.status(400).send({ message: "Please upload an image file!" });
    }

    /* save their file paths in DB */
    req.body.fileSource = '/static/assets/uploads/'+req.file.originalname;

    imageModel.create(req.body).then(async (data, err) => {
        if(err){
            console.log(err);
        }else{
            console.log("Saved To database");
            res.status(200).send({success: true, data: data,
              message: "Uploaded the file successfully: " + req.file.originalname,
            });
        }
    })
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/public/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: "http://localhost:8080/static/assets/uploads/" + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};