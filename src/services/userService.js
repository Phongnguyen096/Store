import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
let handleHashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
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
              firstName: user.firstName,
              lastName: user.lastName,
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
        raw: false,
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

let getUserFromBD = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 2,
          message: "Missing parameter",
        });
      }
      let data = {};
      if (userId === "ALL") {
        data = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        data = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (data) {
        resolve(data);
      }
      resolve({});
    } catch (error) {
      reject(error);
    }
  });
};

let CreateNewUserFromDB = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = await checkUserEmailFromDB(data.email);
      if (checkEmail) {
        resolve({
          errCode: 0,
          message: "Email is already !",
        });
      } else {
        let hashPasswordFromBcrypt = await handleHashUserPassword(
          data.password
        );
        await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashPasswordFromBcrypt,
          roleId: data.roleId,
        });
        resolve({
          errCode: 1,
          message: "Create new user success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserFromDB = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false,
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "The User is not exist",
        });
      }
      await user.destroy();
      resolve({
        errCode: 1,
        errMessage: "The delete user is deleted!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserFromDB = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        console.log(id);
        resolve({
          errCode: 2,
          message: "Missing parameters",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (user) {
        let hashPasswordFromBcrypt;
        if (data.password) {
          hashPasswordFromBcrypt = await handleHashUserPassword(data.password);
        }
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.password = hashPasswordFromBcrypt;
        user.address = data.address;
        user.gender = data.gender;
        user.phoneNumber = data.phoneNumber;
        user.image = data.image;

        await user.save();

        resolve({
          errCode: 1,
          message: "Update the user success",
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
  handleUserLogin: handleUserLogin,
  getUserFromBD: getUserFromBD,
  CreateNewUserFromDB: CreateNewUserFromDB,
  deleteUserFromDB: deleteUserFromDB,
  updateUserFromDB: updateUserFromDB,
};
