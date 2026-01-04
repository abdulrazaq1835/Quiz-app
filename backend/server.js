  import express from 'express';
  import dotenv from 'dotenv';
  import cors from 'cors'
  import { connectDB } from './config/db.js';
  import userRouter from './routes/userRoutes.js';
  dotenv.config()

  const app = express()
  
  const PORT = process.env.PORT || 5000
  connectDB()
  app.use(cors())
  app.use(express.json())

  app.get('/ping',(req,res)=>{
      res.send("heloo quiz")
  })

  app.use('/api/auth',userRouter)

  app.listen(PORT,()=>{
    console.log(`server is  running on ${PORT}`)
  })