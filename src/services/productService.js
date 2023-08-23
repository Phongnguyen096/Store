import db from "../models";
let getProductFromDB = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "abc";
      if (productId === "ALL") {
        data = db.Product.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (productId && productId !== "ALL") {
        data = await db.Product.findOne({
          where: { id: productId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (data) {
        resolve(data);
      } else resolve({ mesage: "empty" });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getProductFromDB: getProductFromDB,
};
