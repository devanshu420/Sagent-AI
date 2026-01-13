import dotenv from "dotenv"
dotenv.config();
import  http from "http";
import app from "./src/app.js";

const httpServer = http.createServer(app);


httpServer.listen(3000,() => {
    console.log("Server is running on Port 3000");
})