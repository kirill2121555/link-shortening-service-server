const express=require('express')
const router=require('./router/router')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { config } = require('dotenv')
require('dotenv').config()

const PORT=process.env.PORT||config.get('wserverPort')

const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'https://linkshortservise.herokuapp.com' }));
app.use('/',router)

app.listen(PORT,()=>console.log(`server started on port ${PORT}`))
