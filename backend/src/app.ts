import express from 'express';
import cors from "cors";
// To connect to MongoDB Database
import { config } from "dotenv";
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
config();
// App variable holds functionality of express application 
const app = express();

// Create routes and middleware
// Middlewares 
// cors allows us to access the server from the 5173 domain
app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// remove this in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;