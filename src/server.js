const express = require("express") ;
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web";
require("dotenv").config() ;
const app = express() ;
const port = process.env.PORT || 8080  ;

// config app 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})) ;

viewEngine(app) ;



const start = async () =>{
    try {
        await initWebRoutes(app) ;
        app.listen(port , ()=>{
             console.log(`Server in running on port ${port}`);
        });
        
    } catch (error) {
        console.log(error) ;
    }
}

start() ;