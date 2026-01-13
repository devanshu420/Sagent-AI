import express from "express";
const app = express();
import userRoutes from "./routes/user.routes.js";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// For Routes
app.use("/api/auth" , userRoutes)



export default app;