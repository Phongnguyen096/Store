import bcrypt from "bcryptjs";
import db from "../models/index" ;
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) =>{
    return new Promise(async(resolve ,reject)=>{
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password : hashPasswordFromBcrypt,
                address: data.address ,
                gender: data.gender ==="1"? true : false ,
                roleId : data.roleId,
                phoneNumber: data.phoneNumber,
            });
            resolve("create a new user success");
        } catch (error) {
            reject(error) ;
        }
    })
}

let hashUserPassword=(password) =>{
    return new Promise(async(resolve , reject)=>{
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword) ;         
        } catch (error) {
            reject(error) ;
        }
    })
}

let getAllUser = () =>{
    return new Promise(async(resolve , reject) =>{
        try {
            let users =await db.User.findAll({
                raw : true ,
            }) ;
            resolve(users)
        } catch (error) {
            reject(error) ;
        }
    }) ;
}

let getUserInfoById =(userId) =>{
    return new Promise(async(resolve ,reject)=>{
        try {
            let user =await db.User.findOne({
                where : {id : userId} ,
                raw : true ,
            });
            if(user){
                resolve(user) ;
            }else{
                resolve({}) ;
            }
           
        } catch (error) {
            reject(error) ;
        }
    }) ;
}

let updateUserData = (data) =>{
    return new Promise(async(resolve , reject)=>{
        try {
           let user = await db.User.findOne({
              where: {id: data.id},
             // raw : true ,
           }); 
           if(user) {
              user.firstName = data.firstName ;
              user.lastName = data.lastName ;
              user.address = data.address ;
              user.phoneNumber = data.phoneNumber ;
              await user.save() ;
              resolve();
             
           }else{
              resolve() ;
           }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUserById = (userId) =>{
    return new Promise(async(resolve , reject) =>{
        try {
            let user = await  db.User.findOne({
                 where :{id : userId}
            });
            if(user){
                user.destroy();
            }
            resolve() ;
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createNewUser: createNewUser ,
    getAllUser : getAllUser ,
    getUserInfoById :getUserInfoById,
    updateUserData :updateUserData  ,
    deleteUserById : deleteUserById ,
}