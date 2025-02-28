import express from "express";
import cors from "cors";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import router from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', router)
app.use('/api/user', authRouter)

// Start server
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
