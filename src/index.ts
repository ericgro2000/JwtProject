import express from "express";
import mongoose from "mongoose";
import authRouter from "./authRouter";
import cors from "cors";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://meMDb3:0123456789@cluster3.j4ik5g5.mongodb.net/`
    );
    app.listen(port, () => console.log(`server started on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
