const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/detail/:id", controller.getFileDetail);
  router.get("/files/:tagName", controller.getListFilesByTagName);
  router.get("/search/:searchText", controller.getFilesBySearch);
  router.get("/tags", controller.getListTags);

  app.use(router);
};

module.exports = routes;