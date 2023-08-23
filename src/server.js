const express = require("express") ;
const cors = require("cors") ;
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB"
import "dotenv/config"
const app = express() ;
const port = process.env.PORT || 8080  ;

// config app 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})) ;
app.use(cors()) ;

viewEngine(app) ;
initWebRoutes(app) ;

const start = async () =>{
    try {
        await connectDB() ;
        app.listen(port , ()=>{
             console.log(`Server in running on port ${port}`);
        });
        
    } catch (error) {
        console.log(error) ;
    }
}

start() ;