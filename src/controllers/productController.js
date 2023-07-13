import productService from  "../services/productService"
let getAllProduct =async (req , res) =>{
    let products = await productService.getAllProductFromDB() ;
    console.log(products) ;
    if(products){
        return res.status(200).json({
            errorCode : 0  ,
            massage : "Success",
            data : products

        }) ;
    }
    return send.status(404).json({
        errorCode : 1 ,
        massage : "products empty !"
    })

}

module.exports = {
    getAllProduct : getAllProduct ,
}