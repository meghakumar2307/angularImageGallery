const uploadFile = require("../middleware/upload");
var galleryModel = require('../models/imageModel');
const fs = require('fs');

const upload = async (req, res) => {
  try {
     /* store the uploaded images on server using multer */
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload an image file!" });
    }

    /* save their file paths in DB */
    req.body.fileSource = '/static/assets/uploads/'+req.file.originalname;

    galleryModel.create(req.body).then(async (data, err) => {
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
  galleryModel.find({}).then((data, err) => {
    if(err) 
       res.status(500).send({
        message: "Unable to scan files!",
      });

    console.log(data);
    res.status(200).send(data);
  })
};


const getFileDetail = (req, res) => {
  galleryModel.find({'_id': req.params.id}).then((data, err) => {
    if(err) 
       res.status(500).send({
        message: "Unable to scan file!",
      });

    console.log(data);
    res.status(200).send(data);
  })
};

const getListFilesByTagName = (req, res, next) => {
  galleryModel.find({'tags': { $regex: '.*' + req.params.tagName + '.*' }}).then((data, err) => {
    if(err) 
       res.status(500).send({
        message: "Unable to scan file!",
      });

    console.log(data);
    res.status(200).send(data);
  })
};


const getFilesBySearch = (req, res, next) => {
  galleryModel.find({
            $or: [
              {'title': { $regex: '.*' + req.params.searchText + '.*' }}, 
              {'tags': { $regex: '.*' + req.params.searchText + '.*' }},
              {'description': { $regex: '.*' + req.params.searchText + '.*' }},
              {'fileSorce': { $regex: '.*' + req.params.searchText + '.*' }}
            ]
        }).then((data, err) => {
    if(err) 
       res.status(500).send({
        message: "Unable to scan file!",
      });

    console.log(data);
    res.status(200).send(data);
  })
};

const getListTags = (req, res) => {
  galleryModel.find({}).distinct('tags').then((data, err) => {
    if(err) 
       res.status(500).send({
        message: "Unable to scan files!",
      });

    data.forEach((tag, index) => {
      if(tag.indexOf(',') > -1) {
        let tags = tag.split(',');
        data.splice(index, 1);
        tags.forEach((t) => {
          data.push(t);
        });
      }
    });

    data = data.filter(function(v, i, self) {  
        return i == self.indexOf(v);
    });

    console.log(data, err);
    res.status(200).send(data);
  })
};


module.exports = {
  upload,
  getListFiles,
  getFileDetail,
  getListFilesByTagName,
  getFilesBySearch,
  getListTags
};