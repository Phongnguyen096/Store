const express = require("express");
import userController from "../controllers/userController";
import productController from "../controllers/productController";
let router = express.Router();

let initWebRoutes = (app) => {
  //user api
  router.get("/api/user/get-user", userController.handleGetUser);
  router.post("/api/user/login", userController.handleLogin);
  router.post("/api/user/create-new-user", userController.handleCreateNewUser);
  router.delete("/api/user/delete-user", userController.handleDeleteUser);
  router.put("/api/user/edit-user", userController.handleUpdateUser);
  //router.put("/api/user/search-user") ;

  //product api
  router.get("/api/product/get-product", productController.handleGetProduct);
  router.post(
    "/api/product/create-new-product",
    productController.handleCreateNewProduct
  );
  router.put("/api/product/edit-product", productController.handleEditProduct);
  router.delete(
    "/api/product/delete-product",
    productController.handleDeleteProduct
  );
  return app.use("/", router);
};

module.exports = initWebRoutes;
