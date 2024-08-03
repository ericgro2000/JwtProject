import express from 'express';
import mongoose from 'mongoose'
import authRouter from './authRouter';
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
  try {
      //await mongoose.connect(`mongodb+srv://mongoMe:0123456789@cluster0.acbnjaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
      app.listen(port, () => console.log(`server started on port ${port}`))
  } catch (e) {
      console.log(e)
  }
}

start()