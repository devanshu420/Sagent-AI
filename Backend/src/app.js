import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

// Create Express Server
const app = express();


// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(express.urlencoded({extended : true}));

// For Routes
app.use("/api/auth" , userRoutes)



export default app;