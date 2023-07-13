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

let displayCRUD =async (req , res) =>{
    let data = await CRUDservice.getAllUser();
    return res.render("displaydb.ejs",{
        dataTable :data ,
    }) ;
}

let getEditCRUD = async (req, res) =>{
    let userId = req.query.id  ;
    if(userId){
        let userData =await CRUDservice.getUserInfoById(userId) ;
        //check user data
        return res.render("editCRUD.ejs",{user : userData}) ;
    }
    else{
        return res.send('User not found') ;
    }
   
}

let getPutCRUD = async (req , res) =>{
    let data = req.body ;
    await CRUDservice.updateUserData(data) ;
    return res.send('update done!') ;
}
let getDeleteCRUD = async (req , res) =>{
    let id  = req.query.id ;
    if(id){ 
        await CRUDservice.deleteUserById(id) ;
        return res.send("Delete user !")
    }else return res.send("User not found !")
   
   
}
module.exports = {
     getHomePage : getHomePage ,
     getCRUD : getCRUD,
     postCRUD:postCRUD,
     displayCRUD :displayCRUD ,
     getEditCRUD : getEditCRUD ,
     getPutCRUD : getPutCRUD ,
     getDeleteCRUD :getDeleteCRUD,
     
}