import db from "../models";
import product from "../models/product";

let getProductFromDB = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      if (productId === "ALL") {
        data = db.Product.findAll();
      }
      if (productId === "TOP") {
        data = await db.Product.findAll({
          order: [["view", "DESC"]],
          limit: 8,
        });
      }
      if (productId && productId !== "ALL" && productId !== "TOP") {
        data = await db.Product.findOne({
          where: { id: productId },
        });
      }
      if (data) {
        resolve(data);
      } else resolve({ message: "empty" });
    } catch (error) {
      reject(error);
    }
  });
};

let createNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkName = await checkProductName(data.name);
      if (checkName) {
        resolve({
          message: "product name is already ~",
        });
      } else {
        await db.Product.create({
          typeID: data.typeID,
          name: data.name,
          price: data.price,
          description: data.description,
          imgUrl: data.imgUrl,
          view: data.view,
        });
        resolve("success create product");
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkProductName = (productName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { name: productName },
      });
      if (product) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteProductFromDB = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { id: productId },
      });
      if (!product) {
        resolve({
          errCode: 2,
          errMessage: "The Product is not exist",
        });
      }
      await db.Product.destroy({
        where: { id: productId },
      });
      resolve({
        errCode: 1,
        massage: "The product is deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let updateProductData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let product = await db.Product.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (product) {
        (product.name = data.name),
          (product.price = data.price),
          (product.description = data.description),
          (product.view = data.view);

        await product.save();

        resolve({
          errCode: 1,
          message: "Update the product success",
        });
      } else {
        resolve({
          errCode: 0,
          massage: "The product is not exits",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getProductFromDB: getProductFromDB,
  createNewProduct: createNewProduct,
  deleteProductFromDB: deleteProductFromDB,
  updateProductData: updateProductData,
};
