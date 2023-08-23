const express = require("express");
import userController from "../controllers/userController";
import productController from "../controllers/productController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/api/users", userController.getAllUser);
  router.get("/api/products", productController.handleGetProduct);
  router.post("/api/login", userController.handleLogin);
  return app.use("/", router);
};

module.exports = initWebRoutes;
