import productService from "../services/productService";
let handleGetProduct = async (req, res) => {
  let id = req.query.id; //ALL , idProducty
  let product = await productService.getProductFromDB(id);
  if (product) {
    return res.status(200).json({
      errorCode: 0,
      massage: "Success",
      product,
    });
  }
  return res.status(404).json({
    errorCode: 1,
    massage: "products empty !",
  });
};

module.exports = {
  handleGetProduct: handleGetProduct,
};
