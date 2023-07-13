const express = require("express") ;
import userController from "../controllers/userController" ;
let router = express.Router();

let initWebRoutes = (app) =>{
       router.post('/api/login', userController.handleLogin) ;
       return app.use("/", router);
}

module.exports = initWebRoutes ;