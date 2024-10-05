import express, { response } from  "express"
import { PORT,mongocon } from "./config.js"
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express() 
app.use(cors())
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// )
//middleware for parsing request body
app.use(express.json())

app.use('/books',booksRoute)

app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send('Welcome to bookstore')
});




mongoose
    .connect(mongocon)
    .then(()=>{
        console.log('App connected to database')
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })