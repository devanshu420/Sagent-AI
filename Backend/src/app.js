import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import Routes
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/poject.routes.js";

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

// For User Routes
app.use("/api/auth" , userRoutes)

// For Project Routes
app.use("/api/project" , projectRoutes)


export default app;