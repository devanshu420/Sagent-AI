import dotenv from "dotenv"
dotenv.config();
import  http from "http";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

// Create HTTP Server
const httpServer = http.createServer(app);

// Connect with DB
connectDB();


httpServer.listen(3000,() => {
    console.log("Server is running on Port 3000");
})