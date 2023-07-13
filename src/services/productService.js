import db from "../models";
let getAllProductFromDB = () =>{
    return new Promise(async (resolve , reject)=>{
        try {
            let data = await db.Product.findAll() ;
            if(data){
                resolve(data);
            }else  resolve({}) ;
        } catch (error) {
            reject(error) ;
        }
    })
}
 module.exports = {
    getAllProductFromDB : getAllProductFromDB ,
 }