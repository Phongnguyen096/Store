import db from "../models/index";
import CRUDservice from "../services/CRUDservice";
let getHomePage =async (req , res)=>{
    try {
        let data = await db.User.findAll();
        //console.log(data) ;
        return res.render('homepage.ejs',{data:JSON.stringify(data)});
    } catch (error) {
        console.log(error) ;
    }
   
}
 
let getCRUD =  async (req , res) =>{
    return res.render('crud.ejs');
}

let postCRUD = async  (req , res) =>{
   let message = await CRUDservice.createNewUser(req.body) ;
   console.log(message);
    return res.send("post CRUD") ;
}
module.exports = {
     getHomePage : getHomePage ,
     getCRUD : getCRUD,
     postCRUD:postCRUD,
}