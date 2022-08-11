const express=require('express')
const mongoose = require('mongoose')
const router=require('./router/router')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { config } = require('dotenv')
require('dotenv').config()

const PORT=process.env.PORT||config.get('serverPort')

const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'https://linkshortservise.herokuapp.com' }));
app.use('/',router)
 
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://dsfecfrreferg:c4gtr84g8rt4gdsdf@cluster0.ve1cs2w.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))

    } catch (e) {
        console.log(e)
    }
}


start()
