const express = require("express") ;
import homeController from "../controllers/home.controller";
let router = express.Router();

let initWebRoutes = (app) =>{
       router.get("/",homeController.getHomePage) ;
       router.get("/crud", homeController.getCRUD) ;
       router.post("/post-crud", homeController.postCRUD);
       return app.use("/", router);
}

module.exports = initWebRoutes ;