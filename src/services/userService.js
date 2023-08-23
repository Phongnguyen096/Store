import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmailFromDB(email);
      if (isExist) {
        // user already exist
        let user = await db.User.findOne({
          where: { email: email },
        });
        if (user) {
          //compare password
          let checkPass = await bcrypt.compareSync(pass, user.password);
          if (checkPass) {
            userData.errCode = 1;
            userData.errMessage = "Success";
            userData.user = {
              email: user.email,
              roleId: user.roleId,
            };
          } else {
            userData.errCode = 2;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 0;
          userData.errMessage = `User's not found !`;
        }
      } else {
        //return err
        userData.errCode = 3;
        userData.errMessage = `Your's Email isn't exist !`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let checkUserEmailFromDB = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUserFromBD = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll();
      if (data) {
        resolve(data);
      } else resolve({});
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUserFromBD: getAllUserFromBD,
};
