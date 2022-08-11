const express=require('express')
const router=require('./router/router')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const PORT=5000

const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use('/api',router)

app.listen(PORT,()=>console.log(`server started on port ${PORT}`))
