import { json } from "body-parser";
import productService from "../services/productService";
import product from "../models/product";
let handleGetProduct = async (req, res) => {
  let id = req.query.id; //ALL , idProduct
  let product = await productService.getProductFromDB(id);
  if (product) {
    return res.status(200).json({
      errorCode: 0,
      massage: "Success",
      product,
    });
  }
  return res.status(404).json({
    massage: "products empty !",
  });
};
let handleCreateNewProduct = async (req, res) => {
  let message = await productService.createNewProduct(req.body);
  if (message) {
    return res.status(200).json({
      message,
    });
  }
  return (
    res.status(404),
    json({
      message: "create product fail !",
    })
  );
};
let handleEditProduct = async (req, res) => {
  let massage = await productService.updateProductData(req.body);
  if (massage) {
    return res.status(200).json({ massage });
  }
  return res.status(404).json({
    massage: "Error api",
  });
};
let handleDeleteProduct = async (req, res) => {
  if (!req.body.id) {
    return res.status(404).json({
      errCode: 0,
      errMessage: "Missing required parameter",
    });
  }
  let massage = await productService.deleteProductFromDB(req.body.id);
  return res.status(200).json(massage);
};
module.exports = {
  handleGetProduct: handleGetProduct,
  handleCreateNewProduct: handleCreateNewProduct,
  handleEditProduct: handleEditProduct,
  handleDeleteProduct: handleDeleteProduct,
};
