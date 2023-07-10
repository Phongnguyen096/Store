const express = require("express") ;
import homeController from "../controllers/home.controller";
let router = express.Router();

let initWebRoutes = (app) =>{
       router.get("/",homeController.getHomePage) ;
       router.get("/about",(req , res)=>{
        return  res.send("about") ;
}) ;
       return app.use("/", router);
}

module.exports = initWebRoutes ;