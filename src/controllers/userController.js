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

let getAllUser = async (req, res) => {
  let users = await userService.getAllUserFromBD();
  if (users) {
    return res.status(200).json({
      errorCode: 0,
      massage: "Success",
      data: users,
    });
  }
  return send.status(404).json({
    errorCode: 1,
    massage: "users empty !",
  });
};
module.exports = {
  handleLogin: handleLogin,
  getAllUser: getAllUser,
};
