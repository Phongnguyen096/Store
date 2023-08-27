import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(200).json({
      errorCode: 1,
      message: "Missing inputs parameter",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetUser = async (req, res) => {
  let id = req.query.id;
  let user = await userService.getUserFromBD(id);
  if (user) {
    return res.status(200).json({
      errorCode: 0,
      massage: "Success",
      user,
    });
  }
  return send.status(404).json({
    errorCode: 1,
    massage: "users empty !",
  });
};

let handleCreateNewUser = async (req, res) => {
  let massage = await userService.CreateNewUserFromDB(req.body);
  if (massage) {
    return res.status(200).json({ massage });
  }
  return res.status(404).json({
    massage: "Create user fail",
  });
};

let handleDeleteUser = async (req, res) => {
  let message = await userService.deleteUserFromDB(req.body.id);
  if (message) {
    res.status(200).json({ message });
  }
  res.status(404).json({ message: "Delete fail" });
};

let handleUpdateUser = async (req, res) => {
  let message = await userService.updateUserFromDB(req.body);
  if (message) {
    res.status(200).json(message);
  }
  res.status(404).json({ message: "Update fail" });
};
module.exports = {
  handleLogin: handleLogin,
  handleGetUser: handleGetUser,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUser: handleDeleteUser,
  handleUpdateUser: handleUpdateUser,
};
