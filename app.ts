import express from "express";
import compression from "compression";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users";
import courseRouter from "./routes/courses";
import assignmentRouter from "./routes/assignments";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
app.use(express.json());
app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/assignments", assignmentRouter);

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  },
  () => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  }
);
