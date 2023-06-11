const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files/:page/:limit", controller.getListFiles);
  router.get("/detail/:id", controller.getFileDetail);
  router.get("/files/:tagName/:page/:limit", controller.getListFilesByTagName);
  router.get("/search/:searchText/:page/:limit", controller.getFilesBySearch);
  router.get("/tags", controller.getListTags);
  router.get("/count/:type/:value", controller.getCount);

  app.use(router);
};

module.exports = routes;