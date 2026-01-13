import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";


// Create Express Server
const app = express();


// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(express.urlencoded({extended : true}));

// For Routes
app.use("/api/auth" , userRoutes)



export default app;