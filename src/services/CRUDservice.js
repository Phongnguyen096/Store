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
module.exports = {
    createNewUser: createNewUser ,
}